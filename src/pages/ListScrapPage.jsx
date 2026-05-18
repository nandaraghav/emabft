import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../components/layout/PageShell';
import Button from '../components/ui/Button';
import ImageUploader from '../components/ui/ImageUploader';
import { materialTypes, sustainabilityTags, colorPalette } from '../data/categories';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const steps = ['Capture', 'Details', 'Value'];

export default function ListScrapPage() {
  const [step, setStep] = useState(0);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({ title: '', material: '', width: '', length: '', weight: '', color: '', texture: '', tags: [], price: '', donate: false });
  const { addListing } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [publishing, setPublishing] = useState(false);

  const updateForm = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const toggleTag = (tag) => setForm(prev => ({ ...prev, tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag] }));

  const publish = async () => {
    setPublishing(true);
    await new Promise(r => setTimeout(r, 1200));
    addListing({
      title: form.title || `${form.material} Scrap`,
      material: form.material,
      seller: user?.name || 'Anonymous',
      sellerId: user?.id,
      sellerType: 'Creator',
      price: parseInt(form.price) || 0,
      originalPrice: parseInt(form.price) ? Math.round(parseInt(form.price) * 1.3) : 0,
      images: images.length > 0 ? images.map(i => i.url) : ['/images/upload_placeholder.png'],
      size: `${form.length || '?'}cm × ${form.width || '?'}cm`,
      gsm: 150,
      composition: form.material,
      texture: form.texture || 'Soft hand feel',
      dimensions: `${form.length || '?'}cm × ${form.width || '?'}cm`,
      category: form.material.toLowerCase() || 'cotton',
      tags: form.tags,
      sustainability: 'Listed by a conscious creator through Stitched — giving new life to surplus materials.',
    });
    setPublishing(false);
    navigate('/');
  };

  return (
    <PageShell>
      <div className="px-5 pt-4">
        <h2 className="font-serif text-2xl font-semibold text-espresso mb-1">List Your Scrap</h2>
        <p className="text-sm text-warm-gray mb-6">Give your surplus textiles a second life</p>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-1.5">
              <div className={`w-full h-1.5 rounded-full transition-colors ${i <= step ? 'bg-rust' : 'bg-cream-dark'}`} />
              <span className={`text-xs font-medium ${i <= step ? 'text-rust' : 'text-warm-gray'}`}>{s}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="font-serif text-lg font-semibold text-espresso mb-4">📸 Capture Material</h3>
              <ImageUploader images={images} onChange={setImages} max={5} />
              <div className="mt-6">
                <label className="block text-xs font-medium text-espresso-light mb-1.5 uppercase tracking-wider">Title</label>
                <input type="text" value={form.title} onChange={e => updateForm('title', e.target.value)} className="w-full px-4 py-3 bg-cream rounded-xl text-sm border border-cream-dark text-espresso" placeholder="e.g. Vintage Silk Remnants" />
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setStep(1)}>Continue</Button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h3 className="font-serif text-lg font-semibold text-espresso mb-2">📋 Specify Details</h3>
              <div>
                <label className="block text-xs font-medium text-espresso-light mb-1.5 uppercase tracking-wider">Material Type</label>
                <select value={form.material} onChange={e => updateForm('material', e.target.value)} className="w-full px-4 py-3 bg-cream rounded-xl text-sm border border-cream-dark text-espresso">
                  <option value="">Select material</option>
                  {materialTypes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-espresso-light mb-1.5 uppercase tracking-wider">Length (cm)</label><input type="number" value={form.length} onChange={e => updateForm('length', e.target.value)} className="w-full px-4 py-3 bg-cream rounded-xl text-sm border border-cream-dark text-espresso" /></div>
                <div><label className="block text-xs font-medium text-espresso-light mb-1.5 uppercase tracking-wider">Width (cm)</label><input type="number" value={form.width} onChange={e => updateForm('width', e.target.value)} className="w-full px-4 py-3 bg-cream rounded-xl text-sm border border-cream-dark text-espresso" /></div>
              </div>
              <div><label className="block text-xs font-medium text-espresso-light mb-1.5 uppercase tracking-wider">Weight (grams)</label><input type="number" value={form.weight} onChange={e => updateForm('weight', e.target.value)} className="w-full px-4 py-3 bg-cream rounded-xl text-sm border border-cream-dark text-espresso" /></div>
              <div>
                <label className="block text-xs font-medium text-espresso-light mb-1.5 uppercase tracking-wider">Color</label>
                <div className="flex flex-wrap gap-2">
                  {colorPalette.slice(0, 12).map(c => (
                    <button key={c.name} onClick={() => updateForm('color', c.name)} className={`w-9 h-9 rounded-full border-2 transition-all ${form.color === c.name ? 'border-rust scale-110' : 'border-cream-dark'}`} style={{ backgroundColor: c.hex }} title={c.name} />
                  ))}
                </div>
              </div>
              <div><label className="block text-xs font-medium text-espresso-light mb-1.5 uppercase tracking-wider">Texture</label><textarea value={form.texture} onChange={e => updateForm('texture', e.target.value)} className="w-full px-4 py-3 bg-cream rounded-xl text-sm border border-cream-dark text-espresso h-20 resize-none" placeholder="Describe the feel..." /></div>
              <div>
                <label className="block text-xs font-medium text-espresso-light mb-1.5 uppercase tracking-wider">Sustainability Tags</label>
                <div className="flex flex-wrap gap-2">
                  {sustainabilityTags.map(tag => (
                    <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${form.tags.includes(tag) ? 'bg-sage text-white' : 'bg-sage-pale text-sage hover:bg-sage/20'}`}>{tag}</button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
                <Button onClick={() => setStep(2)}>Continue</Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h3 className="font-serif text-lg font-semibold text-espresso mb-2">💰 Value & Impact</h3>
              <div>
                <label className="block text-xs font-medium text-espresso-light mb-1.5 uppercase tracking-wider">Price (₹)</label>
                <input type="number" value={form.price} onChange={e => updateForm('price', e.target.value)} className="w-full px-4 py-3 bg-cream rounded-xl text-sm border border-cream-dark text-espresso text-lg font-semibold" placeholder="0" disabled={form.donate} />
              </div>
              <label className="flex items-center gap-3 p-4 bg-sage-pale/40 rounded-xl cursor-pointer">
                <input type="checkbox" checked={form.donate} onChange={e => { updateForm('donate', e.target.checked); if (e.target.checked) updateForm('price', '0'); }} className="w-5 h-5 accent-sage" />
                <div><p className="font-medium text-espresso">Donate Instead</p><p className="text-xs text-warm-gray">Make this material available for free</p></div>
              </label>
              {/* Impact Preview */}
              <div className="bg-sage-pale/40 rounded-2xl p-5 border border-sage/10">
                <h4 className="font-serif text-base font-semibold text-espresso mb-3">🌍 Estimated Impact</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div><div className="text-2xl mb-1">♻️</div><div className="text-sm font-bold text-sage">{form.weight ? `${(form.weight / 1000).toFixed(1)} kg` : '—'}</div><div className="text-[10px] text-warm-gray">Waste Diverted</div></div>
                  <div><div className="text-2xl mb-1">🌱</div><div className="text-sm font-bold text-sage">{form.weight ? `${(form.weight * 3.6 / 1000).toFixed(1)} kg` : '—'}</div><div className="text-[10px] text-warm-gray">CO₂ Saved</div></div>
                  <div><div className="text-2xl mb-1">💧</div><div className="text-sm font-bold text-blue-500">{form.weight ? `${Math.round(form.weight * 10)} L` : '—'}</div><div className="text-[10px] text-warm-gray">Water Saved</div></div>
                </div>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button loading={publishing} onClick={publish}>🧵 Publish Listing</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}

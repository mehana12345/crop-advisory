import React, { useState } from 'react';
import { Layers, Plus, Sprout, MapPin, Droplets, Leaf, ArrowRight, Edit3 } from 'lucide-react';
import { FieldZone, Language } from '../types';
import { translations } from '../translations';

interface FieldZonesViewProps {
  zones: FieldZone[];
  language: Language;
  onSelectZone: (zone: FieldZone) => void;
  onAddZone: (zoneData: Partial<FieldZone>) => Promise<void>;
}

export const FieldZonesView: React.FC<FieldZonesViewProps> = ({
  zones,
  language,
  onSelectZone,
  onAddZone
}) => {
  const t = translations[language];
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newZoneName, setNewZoneName] = useState<string>('');
  const [newZoneCrop, setNewZoneCrop] = useState<string>('Paddy');
  const [newZoneSoil, setNewZoneSoil] = useState<string>('Red Soil');
  const [newZoneArea, setNewZoneArea] = useState<number>(1.5);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZoneName.trim()) return;
    await onAddZone({
      name: newZoneName,
      crop: newZoneCrop,
      soilType: newZoneSoil,
      area: Number(newZoneArea) || 1,
      areaUnit: 'Acres',
      rainfall: 'MEDIUM',
      soilMoisture: 'HIGH',
      nitrogen: 'LOW',
      phosphorus: 'MEDIUM',
      potassium: 'HIGH'
    });
    setNewZoneName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
              {t.fieldZones}
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {language === 'te' 
              ? 'పొలం విభాగాల నిర్వహణ మరియు నిర్దిష్ట పంట పర్యవేక్షణ' 
              : 'Individual field management parcels, soil profiles, and advisory status'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'te' ? 'కొత్త విభాగాన్ని జోడించండి' : 'Add New Zone'}</span>
        </button>
      </div>

      {/* Grid of Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((zone, idx) => {
          const isLowMoist = zone.soilMoisture === 'LOW';

          return (
            <div
              key={zone.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {language === 'te' ? `విభాగం ${idx + 1}` : `Zone ${idx + 1}`}
                  </span>
                  <span className="text-xs font-bold text-stone-500">
                    {zone.area} {zone.areaUnit}
                  </span>
                </div>

                <h3 className="text-lg font-black text-stone-900 tracking-tight">
                  {zone.name}
                </h3>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
                    <span className="text-stone-500 flex items-center gap-1.5">
                      <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                      {t.crop}:
                    </span>
                    <span className="font-bold text-stone-800">{zone.crop} ({zone.season})</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
                    <span className="text-stone-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {t.soilType}:
                    </span>
                    <span className="font-bold text-stone-800">{zone.soilType}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
                    <span className="text-stone-500 flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-sky-600" />
                      {t.soilMoistureStatus}:
                    </span>
                    <span className={`font-extrabold px-2 py-0.5 rounded ${
                      isLowMoist ? 'bg-rose-100 text-rose-800' : 'bg-cyan-100 text-cyan-800'
                    }`}>
                      {zone.soilMoisture}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
                    <span className="text-stone-500 flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                      NPK Status:
                    </span>
                    <span className="font-bold text-stone-800">
                      N:{zone.nitrogen} · P:{zone.phosphorus} · K:{zone.potassium}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectZone(zone)}
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{language === 'te' ? 'సలహాను రూపొందించండి' : 'Run Advisory for this Zone'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Zone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 p-6 shadow-xl animate-in fade-in">
            <h3 className="text-lg font-black text-stone-900 mb-4">
              {language === 'te' ? 'కొత్త పొలం విభాగాన్ని జోడించండి' : 'Create New Farm Zone'}
            </h3>
            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  {language === 'te' ? 'విభాగం పేరు' : 'Zone Name'}
                </label>
                <input
                  type="text"
                  value={newZoneName}
                  onChange={e => setNewZoneName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  placeholder="e.g. East Ridge Cotton Plot"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  {t.crop}
                </label>
                <select
                  value={newZoneCrop}
                  onChange={e => setNewZoneCrop(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg bg-white"
                >
                  {['Paddy', 'Cotton', 'Groundnut', 'Maize', 'Tomato', 'Chili', 'Sugarcane'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  {t.soilType}
                </label>
                <select
                  value={newZoneSoil}
                  onChange={e => setNewZoneSoil(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg bg-white"
                >
                  {['Red Soil', 'Black Soil', 'Clay Soil', 'Sandy Soil', 'Loamy Soil'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  {t.fieldArea} (Acres)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={newZoneArea}
                  onChange={e => setNewZoneArea(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 font-bold"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs"
                >
                  {language === 'te' ? 'జోడించండి' : 'Save Zone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

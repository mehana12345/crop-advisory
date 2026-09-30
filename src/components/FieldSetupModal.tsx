import React, { useState, useEffect } from 'react';
import { X, Sprout, CloudRain, Droplets, Sparkles, Database, Check, AlertCircle } from 'lucide-react';
import { FieldZone, StatusLevel, Language, HistoricalSoilRecord } from '../types';
import { translations } from '../translations';
import { api } from '../services/api';

interface FieldSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => Promise<void>;
  initialZone?: FieldZone | null;
  language: Language;
  district: string;
}

const CROPS = ['Paddy', 'Cotton', 'Groundnut', 'Maize', 'Tomato', 'Chili', 'Sugarcane'];
const SOILS = ['Red Soil', 'Black Soil', 'Clay Soil', 'Sandy Soil', 'Loamy Soil'];
const SEASONS = ['Kharif', 'Rabi', 'Summer'];

export const FieldSetupModal: React.FC<FieldSetupModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialZone,
  language,
  district
}) => {
  const t = translations[language];

  const [crop, setCrop] = useState<string>('Paddy');
  const [season, setSeason] = useState<string>('Kharif');
  const [soilType, setSoilType] = useState<string>('Red Soil');
  const [fieldArea, setFieldArea] = useState<number>(3.5);
  const [areaUnit, setAreaUnit] = useState<string>('Acres');
  const [rainfall, setRainfall] = useState<StatusLevel>('MEDIUM');
  const [soilMoisture, setSoilMoisture] = useState<StatusLevel>('HIGH');
  const [nitrogen, setNitrogen] = useState<StatusLevel>('LOW');
  const [phosphorus, setPhosphorus] = useState<StatusLevel>('MEDIUM');
  const [potassium, setPotassium] = useState<StatusLevel>('HIGH');
  const [zoneName, setZoneName] = useState<string>('North Paddy Field');
  const [nutrientSource, setNutrientSource] = useState<string>('Estimated nutrient status based on available historical information');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [historicalSoilList, setHistoricalSoilList] = useState<HistoricalSoilRecord[]>([]);
  const [autoFilledMsg, setAutoFilledMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialZone) {
      setZoneName(initialZone.name);
      setCrop(initialZone.crop);
      setSeason(initialZone.season);
      setSoilType(initialZone.soilType);
      setFieldArea(initialZone.area);
      setAreaUnit(initialZone.areaUnit || 'Acres');
      setRainfall(initialZone.rainfall);
      setSoilMoisture(initialZone.soilMoisture);
      setNitrogen(initialZone.nitrogen);
      setPhosphorus(initialZone.phosphorus);
      setPotassium(initialZone.potassium);
      if (initialZone.nutrientSource) {
        setNutrientSource(initialZone.nutrientSource);
      }
    }
  }, [initialZone]);

  useEffect(() => {
    api.getHistoricalSoilRecords()
      .then(records => setHistoricalSoilList(records))
      .catch(() => {});
  }, []);

  if (!isOpen) return null;

  const handleAutoFillFromHistory = () => {
    // Find matching record by district or soil type
    const match = historicalSoilList.find(r => 
      r.district.toLowerCase() === district.toLowerCase() || 
      r.soil_type.toLowerCase() === soilType.toLowerCase()
    ) || historicalSoilList[0];

    if (match) {
      setSoilType(match.soil_type);
      setNitrogen(match.historical_nitrogen);
      setPhosphorus(match.historical_phosphorus);
      setPotassium(match.historical_potassium);
      const srcText = `Historical survey record: ${match.district} (${match.source_agency})`;
      setNutrientSource(srcText);
      setAutoFilledMsg(
        language === 'te'
          ? `${match.district} జిల్లా భూసార రికార్డు నుండి నత్రజని, భాస్వరం, పొటాష్ పూరించబడ్డాయి.`
          : `Loaded historical baseline for ${match.district} (${match.soil_type}).`
      );
      setTimeout(() => setAutoFilledMsg(null), 4000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        crop,
        season,
        soilType,
        fieldArea: Number(fieldArea) || 1,
        areaUnit,
        rainfall,
        soilMoisture,
        nitrogen,
        phosphorus,
        potassium,
        zoneName,
        nutrientSource
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-xl overflow-hidden my-8 animate-in fade-in zoom-in duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-lg">
                {language === 'te' ? 'పొలం వివరాల నమోదు & సలహా పొందండి' : 'Field Setup & Advisory Request'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'te' ? 'సరళమైన పరిశీలనలను ఎంచుకోండి' : 'Enter basic field observations to receive personalized guidance'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Field / Zone Name & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                {language === 'te' ? 'పొలం లేదా విభాగం పేరు' : 'Field / Zone Name'}
              </label>
              <input
                type="text"
                value={zoneName}
                onChange={e => setZoneName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                placeholder="e.g. North Acre, Canal Block"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                {t.fieldArea} ({areaUnit})
              </label>
              <div className="flex gap-1">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="100"
                  value={fieldArea}
                  onChange={e => setFieldArea(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  required
                />
                <select
                  value={areaUnit}
                  onChange={e => setAreaUnit(e.target.value)}
                  className="px-2 py-2 text-xs border border-stone-300 rounded-lg bg-stone-50 font-bold"
                >
                  <option value="Acres">Acres</option>
                  <option value="Hectares">Hectares</option>
                </select>
              </div>
            </div>
          </div>

          {/* Crop, Season & Soil Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                {t.crop}
              </label>
              <select
                value={crop}
                onChange={e => setCrop(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg bg-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {CROPS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                {t.season}
              </label>
              <select
                value={season}
                onChange={e => setSeason(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg bg-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {SEASONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                {t.soilType}
              </label>
              <select
                value={soilType}
                onChange={e => setSoilType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg bg-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {SOILS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* WATER & MOISTURE SECTION */}
          <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-100 space-y-4">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-700" />
              <h4 className="text-xs font-extrabold text-sky-950 uppercase tracking-wider">
                {language === 'te' ? 'నీటి పారుదల పరిశీలనలు (సెన్సార్లు అవసరం లేదు)' : 'Moisture & Rainfall Observations'}
              </h4>
            </div>

            {/* Recent Rainfall Status */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                🌧 {t.recentRainfallStatus}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['LOW', 'MEDIUM', 'HIGH'] as StatusLevel[]).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setRainfall(lvl)}
                    className={`py-2 px-3 text-xs font-extrabold rounded-lg border transition-all ${
                      rainfall === lvl
                        ? 'bg-sky-600 text-white border-sky-700 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {lvl === 'LOW' ? t.low : lvl === 'HIGH' ? t.high : t.medium}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Soil Moisture Status (Farmer-Observed) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-700">
                  💧 {t.soilMoistureStatus}
                </label>
                <span className="text-[11px] text-sky-800 font-semibold italic">
                  {t.farmerObservedMoistureLabel}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['LOW', 'MEDIUM', 'HIGH'] as StatusLevel[]).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSoilMoisture(lvl)}
                    className={`py-2 px-3 text-xs font-extrabold rounded-lg border transition-all ${
                      soilMoisture === lvl
                        ? 'bg-cyan-700 text-white border-cyan-800 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {lvl === 'LOW' ? t.low : lvl === 'HIGH' ? t.high : t.medium}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* NUTRIENTS SECTION (N - P - K) */}
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <div>
                  <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                    {language === 'te' ? 'పోషక స్థితి (N - P - K)' : 'Soil Nutrient Status (N - P - K)'}
                  </h4>
                  <span className="text-[11px] text-emerald-800 font-medium block">
                    {t.estimatedNutrientStatusLabel}
                  </span>
                </div>
              </div>

              {/* Auto-fill button */}
              <button
                type="button"
                onClick={handleAutoFillFromHistory}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 transition-colors flex items-center gap-1 shadow-2xs"
              >
                <Database className="w-3 h-3 text-emerald-600" />
                <span>{t.loadHistoricalSoil}</span>
              </button>
            </div>

            {autoFilledMsg && (
              <div className="p-2.5 bg-emerald-100/90 text-emerald-900 rounded-lg text-xs font-medium flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>{autoFilledMsg}</span>
              </div>
            )}

            {/* Nitrogen */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.nitrogenStatus}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['LOW', 'MEDIUM', 'HIGH'] as StatusLevel[]).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setNitrogen(lvl)}
                    className={`py-2 px-3 text-xs font-extrabold rounded-lg border transition-all ${
                      nitrogen === lvl
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {lvl === 'LOW' ? t.low : lvl === 'HIGH' ? t.high : t.medium}
                  </button>
                ))}
              </div>
            </div>

            {/* Phosphorus */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.phosphorusStatus}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['LOW', 'MEDIUM', 'HIGH'] as StatusLevel[]).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setPhosphorus(lvl)}
                    className={`py-2 px-3 text-xs font-extrabold rounded-lg border transition-all ${
                      phosphorus === lvl
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {lvl === 'LOW' ? t.low : lvl === 'HIGH' ? t.high : t.medium}
                  </button>
                ))}
              </div>
            </div>

            {/* Potassium */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.potassiumStatus}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['LOW', 'MEDIUM', 'HIGH'] as StatusLevel[]).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setPotassium(lvl)}
                    className={`py-2 px-3 text-xs font-extrabold rounded-lg border transition-all ${
                      potassium === lvl
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {lvl === 'LOW' ? t.low : lvl === 'HIGH' ? t.high : t.medium}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Sprout className="w-4 h-4" />
              <span>
                {submitting
                  ? (language === 'te' ? 'గణిస్తోంది...' : 'Generating Advisory...')
                  : (language === 'te' ? 'సలహాను రూపొందించండి' : 'Generate Advisory Report')}
              </span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

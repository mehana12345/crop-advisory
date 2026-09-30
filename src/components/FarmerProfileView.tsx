import React, { useState } from 'react';
import { User, Phone, MapPin, Globe, Check, AlertCircle, Save } from 'lucide-react';
import { FarmerProfile, Language } from '../types';
import { translations } from '../translations';

interface FarmerProfileViewProps {
  profile: FarmerProfile;
  language: Language;
  onUpdateProfile: (updated: Partial<FarmerProfile>) => Promise<void>;
  onLanguageChange: (lang: Language) => void;
}

export const FarmerProfileView: React.FC<FarmerProfileViewProps> = ({
  profile,
  language,
  onUpdateProfile,
  onLanguageChange
}) => {
  const t = translations[language];

  const [name, setName] = useState<string>(profile.name);
  const [mobileNumber, setMobileNumber] = useState<string>(profile.mobileNumber);
  const [village, setVillage] = useState<string>(profile.village);
  const [district, setDistrict] = useState<string>(profile.district);
  const [state, setState] = useState<string>(profile.state);
  const [farmName, setFarmName] = useState<string>(profile.farmName);
  const [totalLandArea, setTotalLandArea] = useState<number>(profile.totalLandArea);
  const [areaUnit, setAreaUnit] = useState<string>(profile.areaUnit || 'Acres');
  const [prefLang, setPrefLang] = useState<Language>(profile.preferredLanguage || 'en');
  const [saving, setSaving] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onUpdateProfile({
        name,
        mobileNumber,
        village,
        district,
        state,
        farmName,
        totalLandArea: Number(totalLandArea) || 1,
        areaUnit,
        preferredLanguage: prefLang
      });
      if (prefLang !== language) {
        onLanguageChange(prefLang);
      }
      setSuccessMsg(
        language === 'te' 
          ? 'రైతు వివరాలు విజయవంతంగా భద్రపరచబడ్డాయి!' 
          : 'Farmer profile updated successfully!'
      );
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-stone-200">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
              {t.profile}
            </h2>
            <p className="text-xs text-stone-500">
              {language === 'te' 
                ? 'మీ వ్యవసాయ మరియు సంప్రదింపు వివరాలను నిర్వహించండి' 
                : 'Manage your farm, location, and language preferences (Default: India)'}
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="mt-4 p-3 bg-emerald-100/90 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5 text-sm">
          
          {/* Farmer Name */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
              {t.farmerName}
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
              {t.mobileNumber}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-stone-400 font-bold text-xs">+91</span>
              <input
                type="tel"
                value={mobileNumber}
                onChange={e => setMobileNumber(e.target.value)}
                className="w-full pl-12 pr-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                required
              />
            </div>
          </div>

          {/* Village & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                {t.village}
              </label>
              <input
                type="text"
                value={village}
                onChange={e => setVillage(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                {t.district}
              </label>
              <input
                type="text"
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                required
              />
            </div>
          </div>

          {/* State & Farm Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                {t.state}
              </label>
              <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                {t.farmName}
              </label>
              <input
                type="text"
                value={farmName}
                onChange={e => setFarmName(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                required
              />
            </div>
          </div>

          {/* Total Land Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                {t.totalLandArea}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={totalLandArea}
                  onChange={e => setTotalLandArea(parseFloat(e.target.value) || 1)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                  required
                />
                <select
                  value={areaUnit}
                  onChange={e => setAreaUnit(e.target.value)}
                  className="px-3 py-2.5 border border-stone-300 rounded-xl bg-stone-50 font-bold text-xs"
                >
                  <option value="Acres">Acres</option>
                  <option value="Hectares">Hectares</option>
                </select>
              </div>
            </div>

            {/* Preferred Language */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                {t.preferredLanguage}
              </label>
              <select
                value={prefLang}
                onChange={e => setPrefLang(e.target.value as Language)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl bg-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="en">English</option>
                <option value="te">తెలుగు (Telugu)</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>
                {saving
                  ? (language === 'te' ? 'భద్రపరుస్తోంది...' : 'Saving...')
                  : t.saveChanges}
              </span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

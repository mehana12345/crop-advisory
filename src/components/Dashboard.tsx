import React, { useState } from 'react';
import { 
  Droplets, 
  Leaf, 
  TrendingUp, 
  MapPin, 
  Sprout, 
  Calendar, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  History,
  FileText
} from 'lucide-react';
import { AdvisoryReport, FarmerProfile, FieldZone, Language } from '../types';
import { translations } from '../translations';
import { IrrigationCard } from './IrrigationCard';
import { FertilizerCard } from './FertilizerCard';
import { YieldCard } from './YieldCard';
import { FieldZoneMap } from './FieldZoneMap';

interface DashboardProps {
  profile: FarmerProfile;
  latestReport: AdvisoryReport | null;
  history: AdvisoryReport[];
  zones: FieldZone[];
  language: Language;
  onOpenFieldSetup: () => void;
  onSelectZone: (zone: FieldZone) => void;
  onViewHistory: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  latestReport,
  history,
  zones,
  language,
  onOpenFieldSetup,
  onSelectZone,
  onViewHistory
}) => {
  const t = translations[language];
  const [activeModalCard, setActiveModalCard] = useState<'NONE' | 'IRRIGATION' | 'FERTILIZER' | 'YIELD'>('NONE');

  const currentCrop = latestReport?.field.crop || zones[0]?.crop || 'Paddy';
  const currentSeason = latestReport?.field.season || zones[0]?.season || 'Kharif';
  const currentSoil = latestReport?.field.soilType || zones[0]?.soilType || 'Red Soil';
  const currentField = latestReport?.field.zoneName || profile.farmName || 'Main Field';

  // Irrigation Status Card values
  const isReq = latestReport?.irrigation.statusCode === 'REQUIRED';
  const isNotReq = latestReport?.irrigation.statusCode === 'NOT_REQUIRED';
  const irrigationStatusLabel = isReq 
    ? t.irrigationRequired 
    : isNotReq 
      ? t.irrigationNotRequiredNow 
      : t.monitorSoilMoisture;

  const irrigationBadgeColor = isReq
    ? 'bg-rose-100 text-rose-800 border-rose-200'
    : isNotReq
      ? 'bg-emerald-100 text-emerald-900 border-emerald-200'
      : 'bg-amber-100 text-amber-900 border-amber-200';

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. TOP SECTION: Header Banner with Farmer Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs relative overflow-hidden">
        {/* Subtle decorative agrarian background tint */}
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-emerald-50/70 via-stone-50/30 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest uppercase text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-200">
                {t.appName}
              </span>
              <span className="text-xs font-bold text-stone-500">
                · {t.appSubtitle}
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {profile.name}
              </h1>
              <p className="text-sm font-medium text-stone-600 flex flex-wrap items-center gap-2 mt-1">
                <span className="flex items-center gap-1 text-emerald-800">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  {profile.village}, {profile.district}, {profile.state}
                </span>
                <span>·</span>
                <span className="font-semibold text-stone-800">{currentField}</span>
                <span>·</span>
                <span>{profile.totalLandArea} {profile.areaUnit}</span>
              </p>
            </div>

            {/* Current Active Crop Context Line */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-3 py-1 rounded-lg bg-stone-100 text-stone-800 font-bold border border-stone-200 flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                {t.crop}: {currentCrop}
              </span>
              <span className="px-3 py-1 rounded-lg bg-stone-100 text-stone-800 font-bold border border-stone-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                {t.season}: {currentSeason}
              </span>
              <span className="px-3 py-1 rounded-lg bg-stone-100 text-stone-800 font-bold border border-stone-200">
                {t.soilType}: {currentSoil}
              </span>
            </div>
          </div>

          {/* Quick Action Button to Run/Update Advisory */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onOpenFieldSetup}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm rounded-2xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>{t.runNewAdvisory}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. THREE LARGE PRIMARY CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-stone-900 tracking-tight">
            {language === 'te' ? 'ప్రధాన సలహా ఫలితాలు' : 'Core Advisory Summary'}
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            {latestReport ? `${new Date(latestReport.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* PRIMARY CARD 1: 💧 IRRIGATION */}
          <div 
            onClick={() => setActiveModalCard('IRRIGATION')}
            className="group bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs hover:shadow-md hover:border-sky-300 transition-all cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Droplets className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Output 1
                </span>
              </div>

              <span className="text-xs font-extrabold uppercase tracking-wider text-sky-800 block">
                {t.irrigationAdvisory}
              </span>

              <div className="mt-2">
                <span className={`inline-block text-xs font-black px-2.5 py-1 rounded-lg border uppercase tracking-tight ${irrigationBadgeColor}`}>
                  {irrigationStatusLabel}
                </span>
              </div>

              <p className="text-xs text-stone-600 font-medium mt-3 line-clamp-2">
                {latestReport?.irrigation.why || (language === 'te' ? 'ఇటీవలి వర్షపాతం మరియు నేలలో తేమ ఆధారంగా' : 'Based on observed soil moisture and precipitation')}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-extrabold text-sky-700 group-hover:text-sky-800">
              <span>{t.viewAdvice}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* PRIMARY CARD 2: 🌱 FERTILIZER */}
          <div 
            onClick={() => setActiveModalCard('FERTILIZER')}
            className="group bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Leaf className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Output 2
                </span>
              </div>

              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 block">
                {t.fertilizerAdvisory}
              </span>

              <div className="mt-2 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 font-bold text-xs border border-stone-200">
                  N: {latestReport?.fertilizer.nitrogen || 'LOW'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 font-bold text-xs border border-stone-200">
                  P: {latestReport?.fertilizer.phosphorus || 'MED'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 font-bold text-xs border border-stone-200">
                  K: {latestReport?.fertilizer.potassium || 'HIGH'}
                </span>
              </div>

              <p className="text-xs text-stone-600 font-medium mt-3 line-clamp-2">
                {latestReport?.fertilizer.summary || (language === 'te' ? 'స్థానిక భూసార పరీక్ష మరియు పంట మోతాదు మార్గదర్శకాలు' : 'Crop- and soil-specific nutrient management advice')}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-extrabold text-emerald-800 group-hover:text-emerald-900">
              <span>{t.viewAdvice}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* PRIMARY CARD 3: 📈 YIELD ESTIMATE */}
          <div 
            onClick={() => setActiveModalCard('YIELD')}
            className="group bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Output 3
                </span>
              </div>

              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 block">
                {t.yieldEstimation}
              </span>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  {latestReport?.yieldEstimation.estimated_yield_tons_per_ha || '4.80'}
                </span>
                <span className="text-xs font-bold text-stone-600">
                  {t.tonsPerHectare}
                </span>
              </div>

              <p className="text-xs text-stone-500 font-medium mt-2 line-clamp-2">
                {latestReport 
                  ? `Total harvest projection: ${latestReport.yieldEstimation.estimated_total_yield_tons} metric tons`
                  : 'Statistical regression estimation based on field parameters'}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-extrabold text-amber-800 group-hover:text-amber-900">
              <span>{t.viewEstimate}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* 3. FIELD ZONE MAP (ADSA Visualization) */}
      <FieldZoneMap
        zones={zones}
        farmName={profile.farmName}
        farmerName={profile.name}
        language={language}
        onSelectZoneForAdvisory={onSelectZone}
      />

      {/* 4. RECENT ADVISORY SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
          <div>
            <h3 className="text-lg font-black text-stone-900 tracking-tight">
              {t.recentAdvisories}
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'te' ? 'ఇటీవల జారీ చేసిన సలహాల సారాంశం' : 'Most recent advisory evaluations for your farm fields'}
            </p>
          </div>
          <button
            onClick={onViewHistory}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
          >
            <span>{t.advisoryHistory}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {latestReport ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IrrigationCard
              advisory={latestReport}
              language={language}
              onRunNew={onOpenFieldSetup}
            />
            <FertilizerCard
              advisory={latestReport}
              language={language}
              onRunNew={onOpenFieldSetup}
            />
          </div>
        ) : (
          <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200">
            <FileText className="w-10 h-10 text-stone-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-stone-700">
              {language === 'te' ? 'ఇంకా ఎటువంటి సలహాలు రూపొందించబడలేదు' : 'No advisory report generated yet'}
            </p>
            <button
              onClick={onOpenFieldSetup}
              className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              {t.runNewAdvisory}
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal when clicking on one of the 3 primary cards */}
      {activeModalCard !== 'NONE' && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-150">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <span className="text-xs font-black uppercase text-stone-500 tracking-wider">
                {activeModalCard === 'IRRIGATION' ? t.irrigationAdvisory : activeModalCard === 'FERTILIZER' ? t.fertilizerAdvisory : t.yieldEstimation}
              </span>
              <button
                onClick={() => setActiveModalCard('NONE')}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold px-2 py-1 rounded-md"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              {activeModalCard === 'IRRIGATION' && (
                <IrrigationCard
                  advisory={latestReport}
                  language={language}
                  onRunNew={() => {
                    setActiveModalCard('NONE');
                    onOpenFieldSetup();
                  }}
                />
              )}
              {activeModalCard === 'FERTILIZER' && (
                <FertilizerCard
                  advisory={latestReport}
                  language={language}
                  onRunNew={() => {
                    setActiveModalCard('NONE');
                    onOpenFieldSetup();
                  }}
                />
              )}
              {activeModalCard === 'YIELD' && (
                <YieldCard
                  advisory={latestReport}
                  language={language}
                  onRunNew={() => {
                    setActiveModalCard('NONE');
                    onOpenFieldSetup();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

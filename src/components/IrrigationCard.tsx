import React from 'react';
import { CloudRain, Droplets, Sprout, MapPin, AlertCircle, CheckCircle2, Eye, HelpCircle } from 'lucide-react';
import { AdvisoryReport, Language } from '../types';
import { translations } from '../translations';

interface IrrigationCardProps {
  advisory: AdvisoryReport | null;
  language: Language;
  onRunNew: () => void;
}

export const IrrigationCard: React.FC<IrrigationCardProps> = ({
  advisory,
  language,
  onRunNew
}) => {
  const t = translations[language];

  if (!advisory) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="w-14 h-14 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
          <Droplets className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-stone-800">{t.irrigationAdvisory}</h3>
        <p className="text-sm text-stone-500 mt-1 max-w-sm">
          {language === 'te' 
            ? 'నీటి పారుదల సలహా పొందడానికి పొలం వివరాలను నమోదు చేయండి.' 
            : 'Enter field observations to generate an irrigation recommendation.'}
        </p>
        <button
          onClick={onRunNew}
          className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {t.runNewAdvisory}
        </button>
      </div>
    );
  }

  const { field, irrigation } = advisory;
  const isRequired = irrigation.statusCode === 'REQUIRED';
  const isNotRequired = irrigation.statusCode === 'NOT_REQUIRED';

  // Status visual mapping
  let statusBg = 'bg-amber-50 border-amber-300 text-amber-900';
  let statusIcon = <Eye className="w-6 h-6 text-amber-600" />;
  let localizedStatus = t.monitorSoilMoisture;

  if (isRequired) {
    statusBg = 'bg-rose-50 border-rose-300 text-rose-900';
    statusIcon = <AlertCircle className="w-6 h-6 text-rose-600" />;
    localizedStatus = t.irrigationRequired;
  } else if (isNotRequired) {
    statusBg = 'bg-emerald-50 border-emerald-300 text-emerald-900';
    statusIcon = <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
    localizedStatus = t.irrigationNotRequiredNow;
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Header Banner */}
      <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-stone-900 tracking-tight text-base sm:text-lg">
              {t.irrigationAdvisory}
            </h3>
            <span className="text-xs text-stone-500 font-medium">
              {field.moistureLabel || t.farmerObservedMoistureLabel}
            </span>
          </div>
        </div>

        <span className="text-xs text-stone-500 bg-white px-2.5 py-1 rounded-md border border-stone-200">
          {new Date(advisory.timestamp).toLocaleDateString()}
        </span>
      </div>

      <div className="p-6 space-y-5">
        {/* 4 Essential Field Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-3.5 rounded-xl border border-stone-100 text-xs">
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-sky-600 shrink-0" />
            <div>
              <span className="text-stone-500 block">{t.recentRainfallStatus}</span>
              <span className="font-bold text-stone-800">
                {field.rainfall === 'HIGH' ? t.high : field.rainfall === 'LOW' ? t.low : t.medium}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-cyan-600 shrink-0" />
            <div>
              <span className="text-stone-500 block">{t.farmerObservedMoistureLabel}</span>
              <span className="font-bold text-stone-800">
                {field.soilMoisture === 'HIGH' ? t.high : field.soilMoisture === 'LOW' ? t.low : t.medium}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-stone-500 block">{t.crop}</span>
              <span className="font-bold text-stone-800">{field.crop}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="text-stone-500 block">{t.farmName}</span>
              <span className="font-bold text-stone-800 truncate block max-w-[110px]" title={field.zoneName}>
                {field.zoneName}
              </span>
            </div>
          </div>
        </div>

        {/* Large Prominent Status Badge */}
        <div className={`p-4 rounded-xl border-2 flex items-center gap-3.5 ${statusBg}`}>
          <div className="shrink-0">{statusIcon}</div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider block opacity-75">
              {language === 'te' ? 'నీటి పారుదల సిఫార్సు' : 'Current Recommendation'}
            </span>
            <span className="text-lg sm:text-xl font-black tracking-tight block">
              {localizedStatus}
            </span>
          </div>
        </div>

        {/* Structured Advisory Solution: PROBLEM -> WHY -> ADVISORY -> SUGGESTED ACTION */}
        <div className="space-y-3 text-sm">
          {/* Problem */}
          <div className="border-l-3 border-stone-300 pl-3 py-0.5">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              {t.problem}
            </span>
            <p className="text-stone-800 font-medium mt-0.5">
              {language === 'te' && isRequired ? 'నేలలో తేమ తక్కువగా ఉంది మరియు వర్షపాతం సరిపోదు.' : irrigation.problem}
            </p>
          </div>

          {/* Why */}
          <div className="border-l-3 border-amber-400 pl-3 py-0.5">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
              {t.whyReason}
            </span>
            <p className="text-stone-700 mt-0.5">
              {language === 'te' && isRequired
                ? 'ఇటీవలి వర్షపాతం మరియు రైతు గమనించిన తేమ రెండూ తక్కువగా నమోదయ్యాయి.'
                : irrigation.why}
            </p>
          </div>

          {/* Advisory */}
          <div className="border-l-3 border-sky-500 pl-3 py-0.5">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
              {t.advisory}
            </span>
            <p className="text-stone-800 font-semibold mt-0.5">
              {language === 'te' && isRequired
                ? 'నీటి తడిని ఇవ్వడం సిఫార్సు చేయబడింది.'
                : irrigation.advisory}
            </p>
          </div>

          {/* Suggested Action */}
          <div className="border-l-3 border-emerald-500 pl-3 py-0.5 bg-emerald-50/50 p-2 rounded-r-lg">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              {t.suggestedAction}
            </span>
            <p className="text-stone-800 font-medium mt-0.5">
              {language === 'te' && isRequired
                ? 'పొలం పరిస్థితిని పరిశీలించి పంట దశకు అనుగుణంగా నీటి తడిని అందించండి.'
                : irrigation.suggestedAction}
            </p>
          </div>
        </div>
      </div>

      {/* Safety Notice Footer */}
      <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
        <span className="italic flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          {t.farmerObservedMoistureLabel} ({language === 'te' ? 'రైతు పరిశీలన' : 'visual inspection'})
        </span>
        <button
          onClick={onRunNew}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
        >
          {language === 'te' ? 'సవరించండి' : 'Update Inputs'}
        </button>
      </div>
    </div>
  );
};

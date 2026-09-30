import React from 'react';
import { Leaf, AlertTriangle, CheckCircle, ShieldAlert, Info } from 'lucide-react';
import { AdvisoryReport, Language, StatusLevel } from '../types';
import { translations } from '../translations';

interface FertilizerCardProps {
  advisory: AdvisoryReport | null;
  language: Language;
  onRunNew: () => void;
}

export const FertilizerCard: React.FC<FertilizerCardProps> = ({
  advisory,
  language,
  onRunNew
}) => {
  const t = translations[language];

  if (!advisory) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
          <Leaf className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-stone-800">{t.fertilizerAdvisory}</h3>
        <p className="text-sm text-stone-500 mt-1 max-w-sm">
          {language === 'te' 
            ? 'ఎరువుల యాజమాన్య సిఫార్సుల కోసం పోషక స్థితిని అందించండి.' 
            : 'Enter estimated nutrient status to view fertilizer guidance.'}
        </p>
        <button
          onClick={onRunNew}
          className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {t.runNewAdvisory}
        </button>
      </div>
    );
  }

  const { fertilizer, field } = advisory;

  const renderGauge = (nutrient: string, label: string, level: StatusLevel) => {
    let colorClass = 'bg-emerald-500';
    let textClass = 'text-emerald-700';
    let width = '100%';
    let levelText = t.high;

    if (level === 'LOW') {
      colorClass = 'bg-rose-500';
      textClass = 'text-rose-700';
      width = '30%';
      levelText = t.low;
    } else if (level === 'MEDIUM') {
      colorClass = 'bg-amber-500';
      textClass = 'text-amber-700';
      width = '65%';
      levelText = t.medium;
    }

    return (
      <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-stone-200 font-extrabold text-xs text-stone-800 flex items-center justify-center">
              {nutrient}
            </span>
            <span className="text-xs font-semibold text-stone-700">{label}</span>
          </div>
          <span className={`text-xs font-extrabold uppercase ${textClass}`}>
            {levelText}
          </span>
        </div>
        
        {/* Simple visual bar indicator */}
        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full ${colorClass} rounded-full transition-all duration-500`}
            style={{ width }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Header Banner */}
      <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-stone-900 tracking-tight text-base sm:text-lg">
              {t.fertilizerAdvisory}
            </h3>
            <span className="text-xs text-stone-500 font-medium">
              {field.crop} · {field.season} · {field.soilType}
            </span>
          </div>
        </div>

        <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-medium">
          {field.soilType}
        </span>
      </div>

      <div className="p-6 space-y-5">
        {/* NPK Visual Status Cards */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
              {language === 'te' ? 'పోషక స్థాయి సూచికలు (N - P - K)' : 'Nutrient Levels (N - P - K)'}
            </span>
            <span className="text-[11px] text-stone-400 italic">
              {language === 'te' ? 'అంచనా వేసిన పోషక స్థితి' : 'Historical estimate'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {renderGauge('N', language === 'te' ? 'నత్రజని' : 'Nitrogen', fertilizer.nitrogen)}
            {renderGauge('P', language === 'te' ? 'భాస్వరం' : 'Phosphorus', fertilizer.phosphorus)}
            {renderGauge('K', language === 'te' ? 'పొటాష్' : 'Potassium', fertilizer.potassium)}
          </div>
        </div>

        {/* Advisory Issues List or No Deficiency Notice */}
        <div className="space-y-3">
          {fertilizer.issues.length === 0 ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-950 text-sm block">
                  {language === 'te' ? 'తక్షణ పోషక లోపం లేదు' : 'Optimal Nutrient Balance'}
                </span>
                <p className="text-xs text-emerald-800 mt-1">
                  {language === 'te'
                    ? 'లభ్యమైన సమాచారం ప్రకారం ఎటువంటి తక్షణ పోషక లోపాలు లేవు. స్థానిక వ్యవసాయ సిఫార్సు ప్రకారం సాధారణ ఎరువుల యాజమాన్యాన్ని కొనసాగించండి.'
                    : 'No immediate nutrient deficiency is indicated from the available information. Continue standard maintenance application.'}
                </p>
              </div>
            </div>
          ) : (
            fertilizer.issues.map((issue, idx) => (
              <div 
                key={idx} 
                className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2 text-xs"
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="font-bold text-stone-900 text-sm">
                      {issue.problem}
                    </span>
                  </div>
                  <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {issue.nutrient}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-1 text-stone-700">
                  <div>
                    <span className="font-bold text-stone-500 uppercase tracking-wider block text-[10px]">
                      {t.whyReason}
                    </span>
                    <p className="text-stone-800 font-medium">
                      {issue.reason}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-sky-700 uppercase tracking-wider block text-[10px]">
                      {t.advisory}
                    </span>
                    <p className="text-stone-800 font-semibold">
                      {issue.advisory}
                    </p>
                  </div>

                  <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/60">
                    <span className="font-bold text-emerald-800 uppercase tracking-wider block text-[10px]">
                      {t.suggestedAction}
                    </span>
                    <p className="text-stone-800 font-medium mt-0.5">
                      {issue.suggestedAction}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mandatory Statutory Safe Fertilizer Notice */}
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="font-medium">
            {t.fertilizerDisclaimer}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
        <span className="italic flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          {field.nutrientSource || t.estimatedNutrientStatusLabel}
        </span>
        <button
          onClick={onRunNew}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
        >
          {language === 'te' ? 'పోషకాలను సవరించండి' : 'Update Soil Nutrients'}
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { History, Printer, Trash2, Calendar, Sprout, Droplets, Leaf, TrendingUp, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { AdvisoryReport, Language } from '../types';
import { translations } from '../translations';

interface AdvisoryHistoryProps {
  history: AdvisoryReport[];
  language: Language;
  onClearHistory: () => Promise<void>;
  onSelectReport: (report: AdvisoryReport) => void;
}

export const AdvisoryHistory: React.FC<AdvisoryHistoryProps> = ({
  history,
  language,
  onClearHistory,
  onSelectReport
}) => {
  const t = translations[language];
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [printReport, setPrintReport] = useState<AdvisoryReport | null>(null);
  const [cropFilter, setCropFilter] = useState<string>('ALL');

  const crops = Array.from(new Set(history.map(h => h.field.crop)));

  const filtered = history.filter(item => {
    if (cropFilter !== 'ALL' && item.field.crop !== cropFilter) return false;
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handlePrint = (report: AdvisoryReport) => {
    setPrintReport(report);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Filter */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
              {t.advisoryHistory}
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {language === 'te' 
              ? 'మునుపటి అన్ని పంట, నీటి మరియు ఎరువుల సలహాల రికార్డులు' 
              : 'Complete ledger of generated advisories with irrigation, fertilizer, and yield forecasts'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Crop filter */}
          <select
            value={cropFilter}
            onChange={e => setCropFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold border border-stone-300 rounded-lg bg-stone-50 text-stone-700"
          >
            <option value="ALL">{language === 'te' ? 'అన్ని పంటలు' : 'All Crops'}</option>
            {crops.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearHistory}</span>
            </button>
          )}
        </div>
      </div>

      {/* History Items */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 shadow-xs">
          <History className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-stone-800">
            {language === 'te' ? 'ఎటువంటి సలహా రికార్డులు లేవు' : 'No Advisory History Records'}
          </h4>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            {language === 'te' 
              ? 'కొత్త సలహాను రూపొందించిన తర్వాత ఇక్కడ నమోదు చేయబడుతుంది.' 
              : 'Run a field advisory from the dashboard to log your first record.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => {
            const isExpanded = expandedId === item.reportId;
            const isReq = item.irrigation.statusCode === 'REQUIRED';

            return (
              <div
                key={item.reportId}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all"
              >
                {/* Summary Row */}
                <div 
                  onClick={() => toggleExpand(item.reportId)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/80 select-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isReq ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      <Sprout className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-stone-900 text-base">
                          {item.field.crop}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                          {item.field.season}
                        </span>
                        <span className="text-xs text-stone-500">
                          · {item.field.soilType}
                        </span>
                      </div>
                      
                      <div className="text-xs text-stone-500 mt-1 flex flex-wrap items-center gap-2">
                        <span>{item.field.zoneName} ({item.field.fieldArea} {item.field.areaUnit})</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Badges and Expand Indicator */}
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-lg ${
                        isReq ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {item.irrigation.status}
                      </span>
                      <span className="text-xs font-bold text-stone-600 mt-1">
                        Est. Yield: {item.yieldEstimation.estimated_yield_tons_per_ha} t/ha
                      </span>
                    </div>

                    <div className="text-stone-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-stone-100 bg-stone-50/50 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      
                      {/* Irrigation Detail */}
                      <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-sky-800 uppercase tracking-wider text-[11px]">
                          <Droplets className="w-4 h-4 text-sky-600" />
                          <span>{t.irrigationAdvisory}</span>
                        </div>
                        <p className="font-bold text-stone-900 text-xs">{item.irrigation.advisory}</p>
                        <p className="text-stone-600">Why: {item.irrigation.why}</p>
                        <p className="text-emerald-800 font-semibold bg-emerald-50 p-2 rounded">
                          Action: {item.irrigation.suggestedAction}
                        </p>
                      </div>

                      {/* Fertilizer Detail */}
                      <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-800 uppercase tracking-wider text-[11px]">
                          <Leaf className="w-4 h-4 text-emerald-600" />
                          <span>{t.fertilizerAdvisory}</span>
                        </div>
                        <p className="font-bold text-stone-800">
                          NPK: {item.fertilizer.nitrogen} - {item.fertilizer.phosphorus} - {item.fertilizer.potassium}
                        </p>
                        <p className="text-stone-600">{item.fertilizer.summary}</p>
                        <p className="text-[11px] text-amber-800 italic bg-amber-50 p-1.5 rounded">
                          {item.fertilizer.statutoryDisclaimer}
                        </p>
                      </div>

                      {/* Yield Detail */}
                      <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-amber-800 uppercase tracking-wider text-[11px]">
                          <TrendingUp className="w-4 h-4 text-amber-600" />
                          <span>{t.yieldEstimation}</span>
                        </div>
                        <div className="text-base font-extrabold text-stone-900">
                          {item.yieldEstimation.estimated_yield_tons_per_ha} tons/hectare
                        </div>
                        <p className="text-stone-600">
                          Total Forecast: {item.yieldEstimation.estimated_total_yield_tons} tons for {item.field.fieldArea} {item.field.areaUnit}
                        </p>
                        <p className="text-[11px] text-stone-500 italic">
                          {item.yieldEstimation.disclaimer}
                        </p>
                      </div>

                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => onSelectReport(item)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                      >
                        {language === 'te' ? 'ఈ సలహాను డాష్‌బోర్డ్‌లో చూడండి →' : 'View on Dashboard →'}
                      </button>

                      <button
                        onClick={() => handlePrint(item)}
                        className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>{t.printSlip}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Printable Slip Component (visible when printing) */}
      {printReport && (
        <div className="hidden print:block fixed inset-0 bg-white p-8 z-50 text-black font-sans">
          <div className="max-w-md mx-auto border-2 border-black p-6 space-y-4">
            <div className="text-center border-b pb-3">
              <h2 className="text-xl font-black uppercase">CROP ADVISORY SLIP</h2>
              <p className="text-xs font-semibold">Smart Farmer Assistant</p>
              <p className="text-xs mt-1">Date: {new Date(printReport.timestamp).toLocaleString()}</p>
            </div>

            <div className="text-xs space-y-1 border-b pb-2">
              <p><strong>Farmer:</strong> {printReport.farmer.name} ({printReport.farmer.mobileNumber})</p>
              <p><strong>Location:</strong> {printReport.farmer.village}, {printReport.farmer.district}, {printReport.farmer.state}</p>
              <p><strong>Field:</strong> {printReport.field.zoneName} ({printReport.field.fieldArea} {printReport.field.areaUnit})</p>
              <p><strong>Crop & Season:</strong> {printReport.field.crop} - {printReport.field.season} ({printReport.field.soilType})</p>
            </div>

            <div className="space-y-3 text-xs border-b pb-3">
              <div>
                <p className="font-bold uppercase underline">1. IRRIGATION ADVISORY</p>
                <p className="text-sm font-black mt-0.5">{printReport.irrigation.status}</p>
                <p><strong>Why:</strong> {printReport.irrigation.why}</p>
                <p><strong>Action:</strong> {printReport.irrigation.suggestedAction}</p>
              </div>

              <div>
                <p className="font-bold uppercase underline">2. FERTILIZER ADVISORY</p>
                <p><strong>NPK Status:</strong> N: {printReport.fertilizer.nitrogen} | P: {printReport.fertilizer.phosphorus} | K: {printReport.fertilizer.potassium}</p>
                <p><strong>Summary:</strong> {printReport.fertilizer.summary}</p>
                <p className="italic text-[10px]">{printReport.fertilizer.statutoryDisclaimer}</p>
              </div>

              <div>
                <p className="font-bold uppercase underline">3. YIELD ESTIMATION</p>
                <p className="text-sm font-black">{printReport.yieldEstimation.estimated_yield_tons_per_ha} tons/hectare</p>
                <p><strong>Total:</strong> {printReport.yieldEstimation.estimated_total_yield_tons} metric tons</p>
                <p className="italic text-[10px]">{printReport.yieldEstimation.disclaimer}</p>
              </div>
            </div>

            <div className="text-[10px] text-center pt-2">
              <p>Generated by CROP ADVISORY Rule Engine</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

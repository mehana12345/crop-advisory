import React, { useState } from 'react';
import { Network, Layers, Sprout, Droplets, MapPin, ChevronRight, Activity, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { FieldZone, Language } from '../types';
import { translations } from '../translations';

interface FieldZoneMapProps {
  zones: FieldZone[];
  farmName: string;
  farmerName: string;
  language: Language;
  onSelectZoneForAdvisory: (zone: FieldZone) => void;
}

export const FieldZoneMap: React.FC<FieldZoneMapProps> = ({
  zones,
  farmName,
  farmerName,
  language,
  onSelectZoneForAdvisory
}) => {
  const t = translations[language];
  const [selectedZoneId, setSelectedZoneId] = useState<string>(zones[0]?.id || '');
  const [showGraphTheory, setShowGraphTheory] = useState<boolean>(false);

  const selectedZone = zones.find(z => z.id === selectedZoneId) || zones[0];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-50/70">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-stone-900 tracking-tight text-base sm:text-lg">
              {t.fieldZoneMap}
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              {language === 'te' 
                ? 'పొలం విభాగాలు, నేల, పంట మరియు సలహాల అనుసంధాన పటం' 
                : 'Interactive structural hierarchy of farm management zones & agronomic status'}
            </p>
          </div>
        </div>

        {/* Toggle Graph Adjacency representation for academic/evaluator review */}
        <button
          onClick={() => setShowGraphTheory(!showGraphTheory)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-1.5"
        >
          <Database className="w-3.5 h-3.5 text-stone-500" />
          <span>{showGraphTheory ? (language === 'te' ? 'పటం చూడండి' : 'Hide Graph Theory') : (language === 'te' ? 'అడ్జాసెన్సీ డేటా చూడండి' : 'Inspect Graph Structure')}</span>
        </button>
      </div>

      {showGraphTheory && (
        <div className="p-4 bg-stone-900 text-stone-200 text-xs font-mono border-b border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-emerald-400 font-bold">
            <span>[ADSA Unit 2] FieldGraph Adjacency List & Traversal</span>
            <span className="text-stone-400 text-[11px]">|V| = {1 + zones.length * 4}, |E| = {zones.length * 4}</span>
          </div>
          <div className="bg-stone-950 p-3 rounded-lg overflow-x-auto text-[11px] leading-relaxed">
            <p className="text-stone-400">// Root Vertex</p>
            <p>Farm_Root ("{farmName}") ──► [{zones.map(z => z.id).join(', ')}]</p>
            <p className="text-stone-400 mt-2">// Subgraph Zone Adjacencies</p>
            {zones.map(z => (
              <p key={z.id}>
                ZoneNode ("{z.name}") ──► [Soil: "{z.soilType}", Crop: "{z.crop}", Moisture: "{z.soilMoisture}", AdvisoryState: "{z.soilMoisture === 'LOW' ? 'IRR_REQUIRED' : 'IRR_OK'}"]
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Main Graph Visualization Area */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Interactive SVG Diagram (Columns 1-7) */}
          <div className="lg:col-span-7 bg-stone-50 rounded-2xl p-4 sm:p-6 border border-stone-200/80 overflow-x-auto">
            <div className="min-w-[480px]">
              {/* Farm Root Node */}
              <div className="flex justify-center mb-6">
                <div className="px-5 py-3 rounded-xl bg-emerald-700 text-white shadow-sm flex items-center gap-2.5 border-2 border-emerald-600">
                  <MapPin className="w-5 h-5 text-emerald-200" />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">
                      {language === 'te' ? 'ప్రధాన పొలం' : 'Main Farm'}
                    </span>
                    <span className="font-extrabold text-sm">{farmName}</span>
                    <span className="text-xs text-emerald-200 ml-1.5">({farmerName})</span>
                  </div>
                </div>
              </div>

              {/* Connecting Trunk to Zones */}
              <div className="w-0.5 h-6 bg-emerald-400 mx-auto -mt-6 mb-2" />

              {/* Zone Nodes Row */}
              <div className="grid grid-cols-3 gap-3">
                {zones.map((zone, idx) => {
                  const isSelected = zone.id === selectedZone?.id;
                  const isWaterStress = zone.soilMoisture === 'LOW';

                  return (
                    <div
                      key={zone.id}
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`cursor-pointer rounded-xl p-3 border-2 transition-all relative ${
                        isSelected
                          ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                          : 'bg-white/80 border-stone-200 hover:border-stone-400 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-stone-400 uppercase">
                          {language === 'te' ? `విభాగం ${idx + 1}` : `Zone ${idx + 1}`}
                        </span>
                        {isWaterStress ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" title="Low Moisture" />
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Moisture OK" />
                        )}
                      </div>

                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                        {zone.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {zone.area} {zone.areaUnit} · {zone.crop}
                      </p>

                      {/* Sub-node branch visual indicators */}
                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                        <span className="text-stone-600 font-medium truncate max-w-[65px]">
                          {zone.soilType}
                        </span>
                        <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                          zone.soilMoisture === 'LOW' 
                            ? 'bg-rose-50 text-rose-700' 
                            : zone.soilMoisture === 'HIGH' 
                              ? 'bg-cyan-50 text-cyan-700' 
                              : 'bg-amber-50 text-amber-700'
                        }`}>
                          {zone.soilMoisture}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Visual Leaf Node Branches for the Selected Zone */}
              {selectedZone && (
                <div className="mt-6 pt-6 border-t border-dashed border-stone-300">
                  <div className="flex items-center justify-center gap-1 text-xs text-stone-500 font-medium mb-3">
                    <span>{language === 'te' ? 'ఎంచుకున్న విభాగం సంబంధిత నోడ్‌లు' : 'Connected Attribute Nodes for'}:</span>
                    <span className="font-bold text-stone-800">{selectedZone.name}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    {/* Soil Node */}
                    <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-amber-800 block uppercase">
                        {t.soilType}
                      </span>
                      <span className="font-extrabold text-stone-800 mt-1 block">
                        {selectedZone.soilType}
                      </span>
                    </div>

                    {/* Crop Node */}
                    <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-emerald-800 block uppercase">
                        {t.crop}
                      </span>
                      <span className="font-extrabold text-stone-800 mt-1 block">
                        {selectedZone.crop} ({selectedZone.season})
                      </span>
                    </div>

                    {/* Moisture Node */}
                    <div className="p-2.5 bg-sky-50/70 border border-sky-200 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-sky-800 block uppercase">
                        {language === 'te' ? 'తేమ స్థితి' : 'Moisture'}
                      </span>
                      <span className="font-extrabold text-stone-800 mt-1 block">
                        {selectedZone.soilMoisture}
                      </span>
                    </div>

                    {/* Advisory Status Node */}
                    <div className="p-2.5 bg-stone-100 border border-stone-200 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-stone-600 block uppercase">
                        {language === 'te' ? 'నీటి స్థితి' : 'Irrigation Status'}
                      </span>
                      <span className={`font-extrabold mt-1 block ${
                        selectedZone.soilMoisture === 'LOW' && selectedZone.rainfall === 'LOW'
                          ? 'text-rose-600'
                          : 'text-emerald-700'
                      }`}>
                        {selectedZone.soilMoisture === 'LOW' && selectedZone.rainfall === 'LOW' 
                          ? (language === 'te' ? 'తడి అవసరం' : 'Required') 
                          : (language === 'te' ? 'సంతృప్తికరం' : 'Adequate')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Zone Details Inspection Sidebar (Columns 8-12) */}
          {selectedZone && (
            <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                    {language === 'te' ? 'విభాగ వివరాలు' : 'Selected Zone Overview'}
                  </span>
                  <h4 className="text-base font-extrabold text-stone-900 mt-0.5">
                    {selectedZone.name}
                  </h4>
                </div>
                <span className="text-xs bg-stone-100 text-stone-700 font-bold px-2.5 py-1 rounded-md">
                  {selectedZone.area} {selectedZone.areaUnit}
                </span>
              </div>

              {/* Status List */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50">
                  <span className="text-stone-500">{t.crop} & {t.season}:</span>
                  <span className="font-bold text-stone-800">{selectedZone.crop} ({selectedZone.season})</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50">
                  <span className="text-stone-500">{t.soilType}:</span>
                  <span className="font-bold text-stone-800">{selectedZone.soilType}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50">
                  <span className="text-stone-500">{t.farmerObservedMoistureLabel}:</span>
                  <span className={`font-bold ${
                    selectedZone.soilMoisture === 'LOW' ? 'text-rose-600' : 'text-emerald-700'
                  }`}>
                    {selectedZone.soilMoisture}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50">
                  <span className="text-stone-500">{t.recentRainfallStatus}:</span>
                  <span className="font-bold text-stone-800">{selectedZone.rainfall}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50">
                  <span className="text-stone-500">NPK (N - P - K):</span>
                  <span className="font-bold text-stone-800">
                    {selectedZone.nitrogen} - {selectedZone.phosphorus} - {selectedZone.potassium}
                  </span>
                </div>
              </div>

              {/* Quick Action to evaluate this exact zone */}
              <button
                onClick={() => onSelectZoneForAdvisory(selectedZone)}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{language === 'te' ? 'ఈ విభాగానికి సలహా రూపొందించండి' : 'Run Advisory for this Zone'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

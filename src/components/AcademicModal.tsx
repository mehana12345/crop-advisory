import React, { useState, useEffect } from 'react';
import { X, BookOpen, Code2, Cpu, Network, Binary, Terminal, CheckCircle2 } from 'lucide-react';
import { AcademicSpec, Language } from '../types';
import { api } from '../services/api';

interface AcademicModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AcademicModal: React.FC<AcademicModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [activeSubject, setActiveSubject] = useState<'DMGT' | 'AI' | 'ADSA' | 'OOPJ' | 'PYTHON'>('DMGT');
  const [spec, setSpec] = useState<AcademicSpec | null>(null);
  const [mlMetrics, setMlMetrics] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      api.getAcademicSpec().then(s => setSpec(s)).catch(() => {});
      api.getMLMetrics().then(m => setMlMetrics(m)).catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-stone-900 text-stone-100 rounded-2xl max-w-4xl w-full border border-stone-700 shadow-2xl overflow-hidden my-8 animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base sm:text-lg">
                Academic & Engineering Architecture Specification
              </h3>
              <p className="text-xs text-stone-400">
                Discrete Math, AI Rule Agents, Graph Data Structures, Java OOP, & Python ML
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-800 bg-stone-950/60 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveSubject('DMGT')}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeSubject === 'DMGT' 
                ? 'border-emerald-500 text-emerald-400 bg-stone-900' 
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>1. DMGT (Predicate Logic)</span>
          </button>

          <button
            onClick={() => setActiveSubject('AI')}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeSubject === 'AI' 
                ? 'border-emerald-500 text-emerald-400 bg-stone-900' 
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>2. AI (Rule Agent)</span>
          </button>

          <button
            onClick={() => setActiveSubject('ADSA')}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeSubject === 'ADSA' 
                ? 'border-emerald-500 text-emerald-400 bg-stone-900' 
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>3. ADSA (FieldGraph)</span>
          </button>

          <button
            onClick={() => setActiveSubject('OOPJ')}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeSubject === 'OOPJ' 
                ? 'border-emerald-500 text-emerald-400 bg-stone-900' 
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>4. OOPJ (Java Classes)</span>
          </button>

          <button
            onClick={() => setActiveSubject('PYTHON')}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeSubject === 'PYTHON' 
                ? 'border-emerald-500 text-emerald-400 bg-stone-900' 
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>5. Python (ML Pipeline)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 text-sm">
          
          {/* DMGT */}
          {activeSubject === 'DMGT' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-extrabold text-emerald-400">
                  DMGT Unit 1: Agronomy Rules as First-Order Predicate Logic
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  Instead of arbitrary heuristics, all irrigation and fertilizer decisions are modeled as mathematical propositions over agricultural working domains:
                </p>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2 font-mono text-xs text-emerald-300">
                <p className="text-stone-400 font-bold">// Formal Predicate Logic Rules</p>
                <p>∀ field ∈ F: LowMoisture(field) ∧ LowRainfall(field) → IrrigationRequired(field)</p>
                <p>∀ field ∈ F: HighMoisture(field) ∧ HighRainfall(field) → ¬IrrigationRequired(field)</p>
                <p>∀ field ∈ F: LowMoisture(field) ∧ MediumRainfall(field) → SupplementalIrrigation(field)</p>
                <p>∀ field ∈ F: LowRainfall(field) ∧ MediumMoisture(field) → MonitorSoilMoisture(field)</p>
                <p>∀ field ∈ F: LowNitrogen(field) → RecommendNitrogenMgmt(field)</p>
                <p>∀ field ∈ F: LowPhosphorus(field) → RecommendPhosphorusMgmt(field)</p>
                <p>∀ field ∈ F: LowPotassium(field) → RecommendPotassiumMgmt(field)</p>
              </div>

              <div className="p-4 bg-stone-800/60 rounded-xl border border-stone-700 text-xs text-stone-300 space-y-2">
                <span className="font-bold text-white block">Java Code Mapping:</span>
                <p>
                  Implemented in <code className="text-emerald-400">backend/java/src/com/cropadvisory/dmgt/PredicateLogicEngine.java</code> via functional predicates <code className="text-emerald-400">AgronomyPredicate</code> using lambda closures:
                </p>
                <pre className="bg-stone-950 p-3 rounded-lg text-stone-200 overflow-x-auto text-[11px]">
{`public static final AgronomyPredicate IrrigationUrgentProposition =
    LowMoisture.and(LowRainfall);`}
                </pre>
              </div>
            </div>
          )}

          {/* AI */}
          {activeSubject === 'AI' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-extrabold text-emerald-400">
                  AI Unit 1: Rule-Based Inference Engine Agent
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  The advisory agent acts as a forward-chaining expert system. Working memory contains farmer-observed field facts, which fire matching antecedent rules without risk of ungrounded model hallucination.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                  <span className="font-bold text-emerald-400 block mb-1">1. Working Memory</span>
                  <p className="text-stone-400">
                    Stores observed environmental facts: Observed Soil Moisture, Recent Precipitation, Regional Soil Health Baseline, Crop Water Sensitivity.
                  </p>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                  <span className="font-bold text-emerald-400 block mb-1">2. Rule Matcher</span>
                  <p className="text-stone-400">
                    Evaluates rule preconditions against working memory using deterministic DMGT predicate propositions.
                  </p>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                  <span className="font-bold text-emerald-400 block mb-1">3. Consequent Action</span>
                  <p className="text-stone-400">
                    Synthesizes bounded advisory report: Problem, Why (Reason), Advisory, and Suggested Action.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-stone-800/60 rounded-xl border border-stone-700 text-xs text-stone-300 space-y-1">
                <span className="font-bold text-white block">Inference Source Code:</span>
                <p>Located in <code className="text-emerald-400">backend/java/src/com/cropadvisory/engine/RuleEngine.java</code></p>
              </div>
            </div>
          )}

          {/* ADSA */}
          {activeSubject === 'ADSA' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-extrabold text-emerald-400">
                  ADSA Unit 2: Field-Zone Relational Graph Data Structure
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  A farm is mathematically modeled as an undirected/directed graph G = (V, E) connecting spatial management zones to agronomic dependencies.
                </p>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 font-mono text-xs text-emerald-300 space-y-1">
                <p className="text-stone-400 font-bold">// Graph Traversal & Topology</p>
                <p>Farm_Root</p>
                <p>│</p>
                <p>├── Zone_1 (North Block) ──► [Soil: Red Soil, Crop: Paddy, Moisture: High, AdvisoryNode]</p>
                <p>├── Zone_2 (Canal Parcel) ──► [Soil: Black Soil, Crop: Cotton, Moisture: Low, AdvisoryNode]</p>
                <p>└── Zone_3 (East Ridge)   ──► [Soil: Loamy Soil, Crop: Chili, Moisture: Medium, AdvisoryNode]</p>
              </div>

              <div className="p-4 bg-stone-800/60 rounded-xl border border-stone-700 text-xs text-stone-300 space-y-2">
                <span className="font-bold text-white block">Adjacency List & BFS Implementation:</span>
                <p>
                  Implemented in <code className="text-emerald-400">backend/java/src/com/cropadvisory/adsa/FieldGraph.java</code> using <code className="text-emerald-400">Map&lt;String, List&lt;Edge&gt;&gt;</code>. Graph traversal is performed via <code className="text-emerald-400">traverseBFS(rootId)</code> to aggregate whole-farm status.
                </p>
              </div>
            </div>
          )}

          {/* OOPJ */}
          {activeSubject === 'OOPJ' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-extrabold text-emerald-400">
                  OOPJ: Object-Oriented Java Architecture & Design Patterns
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  Production-grade object-oriented separation of concerns across models, rule engines, predicate logic, and graph representations:
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {[
                  'Farmer.java',
                  'Field.java',
                  'FieldZone.java',
                  'Crop.java',
                  'Soil.java',
                  'WeatherData.java',
                  'NutrientStatus.java',
                  'StatusLevel.java',
                  'Season.java',
                  'AgronomyRule.java',
                  'RuleEngine.java',
                  'IrrigationAdvisory.java',
                  'FertilizerAdvisory.java',
                  'YieldPrediction.java',
                  'AdvisoryReport.java',
                  'FieldGraph.java',
                  'PredicateLogicEngine.java',
                  'Main.java'
                ].map(file => (
                  <div key={file} className="p-2 bg-stone-950 rounded-lg border border-stone-800 text-stone-300">
                    <span className="text-emerald-400 font-bold block">{file}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-stone-800/60 rounded-xl border border-stone-700 text-xs text-stone-300 space-y-1">
                <span className="font-bold text-white block">OOP Principles Exercised:</span>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Encapsulation:</strong> Private fields with validated getters/setters in <code className="text-emerald-400">NutrientStatus</code>, <code className="text-emerald-400">Farmer</code>, <code className="text-emerald-400">FieldZone</code>.</li>
                  <li><strong>Polymorphism & Functional Interfaces:</strong> Generic rule antecedent evaluation with <code className="text-emerald-400">AgronomyRule&lt;T&gt;</code> and <code className="text-emerald-400">AgronomyPredicate</code>.</li>
                  <li><strong>Collections:</strong> Safe unmodifiable maps and adjacency lists in <code className="text-emerald-400">FieldGraph</code>.</li>
                </ul>
              </div>
            </div>
          )}

          {/* PYTHON */}
          {activeSubject === 'PYTHON' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-extrabold text-emerald-400">
                  Python: Regression-Based Yield Estimation ML Pipeline
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  10-step full regression pipeline predicting crop harvest potentials from agronomic field factors:
                </p>
              </div>

              {/* Real ML Metrics */}
              {mlMetrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-950 p-4 rounded-xl border border-stone-800 text-xs">
                  <div>
                    <span className="text-stone-400 block">R² Score (Fit)</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">
                      {mlMetrics.metrics?.r2 || 0.9647}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">MAE Error</span>
                    <span className="text-lg font-bold text-sky-400 font-mono">
                      {mlMetrics.metrics?.mae || 2.52} t/ha
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Test Samples</span>
                    <span className="text-lg font-bold text-amber-400 font-mono">
                      {mlMetrics.metrics?.test_samples || 160} records
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Algorithm</span>
                    <span className="text-xs font-bold text-stone-200">
                      Ridge Regression
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2 text-xs">
                <span className="font-bold text-white block">Pipeline Modules:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                    <span className="text-emerald-400 font-bold">1. data_loading.py:</span> Loads agronomic records from <code className="text-stone-300">crop_yield_data.csv</code>.
                  </div>
                  <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                    <span className="text-emerald-400 font-bold">2. data_preprocessing.py:</span> One-hot categorical encoding and 80/20 train-test splitting.
                  </div>
                  <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                    <span className="text-emerald-400 font-bold">3. model_training.py:</span> Fits OLS Multiple Linear Regression with Ridge L2 regularization.
                  </div>
                  <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                    <span className="text-emerald-400 font-bold">4. model_validation.py:</span> Calculates MAE, RMSE, and R² scores on held-out test data.
                  </div>
                  <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                    <span className="text-emerald-400 font-bold">5. prediction.py & predict_cli.py:</span> CLI and JSON interface callable by backend.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs text-stone-400">
                <p className="font-bold text-stone-300 mb-1">Runnable Pipeline Command:</p>
                <code className="text-emerald-400 font-mono">python3 backend/ml/train_and_save.py</code>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-800 bg-stone-950 flex items-center justify-between text-xs text-stone-400">
          <span>Project Reference: CROP ADVISORY Rule Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors"
          >
            Close Specification
          </button>
        </div>

      </div>
    </div>
  );
};

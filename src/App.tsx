import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { IrrigationCard } from './components/IrrigationCard';
import { FertilizerCard } from './components/FertilizerCard';
import { YieldCard } from './components/YieldCard';
import { FieldZoneMap } from './components/FieldZoneMap';
import { FieldZonesView } from './components/FieldZonesView';
import { AdvisoryHistory } from './components/AdvisoryHistory';
import { FarmerProfileView } from './components/FarmerProfileView';
import { FieldSetupModal } from './components/FieldSetupModal';
import { AcademicModal } from './components/AcademicModal';
import { AdvisoryReport, FarmerProfile, FieldZone, Language } from './types';
import { api } from './services/api';
import { translations } from './translations';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [language, setLanguage] = useState<Language>('en');
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [zones, setZones] = useState<FieldZone[]>([]);
  const [history, setHistory] = useState<AdvisoryReport[]>([]);
  const [latestReport, setLatestReport] = useState<AdvisoryReport | null>(null);
  const [selectedZoneForModal, setSelectedZoneForModal] = useState<FieldZone | null>(null);
  const [isFieldSetupOpen, setIsFieldSetupOpen] = useState<boolean>(false);
  const [isAcademicOpen, setIsAcademicOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Initial Load from API
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [profData, zonesData, histData] = await Promise.all([
          api.getProfile().catch(() => null),
          api.getZones().catch(() => []),
          api.getAdvisoryHistory().catch(() => [])
        ]);

        if (profData) {
          setProfile(profData);
          if (profData.preferredLanguage) {
            setLanguage(profData.preferredLanguage);
          }
        }

        if (zonesData && zonesData.length > 0) {
          setZones(zonesData);
        }

        if (histData && histData.length > 0) {
          setHistory(histData);
          setLatestReport(histData[0]);
        } else if (zonesData && zonesData.length > 0) {
          // If no history exists yet, generate initial baseline report for Zone 1
          const z = zonesData[0];
          try {
            const initialAdv = await api.evaluateAdvisory({
              crop: z.crop,
              season: z.season,
              soilType: z.soilType,
              fieldArea: z.area,
              areaUnit: z.areaUnit,
              rainfall: z.rainfall,
              soilMoisture: z.soilMoisture,
              nitrogen: z.nitrogen,
              phosphorus: z.phosphorus,
              potassium: z.potassium,
              zoneName: z.name,
              nutrientSource: z.nutrientSource
            });
            if (initialAdv && initialAdv.report) {
              setLatestReport(initialAdv.report);
              setHistory([initialAdv.report]);
            }
          } catch (e) {
            console.warn('Initial advisory run:', e);
          }
        }
      } catch (err) {
        console.error('Error loading initial data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  const handleUpdateProfile = async (updated: Partial<FarmerProfile>) => {
    const res = await api.updateProfile(updated);
    if (res.profile) {
      setProfile(res.profile);
    }
  };

  const handleAddZone = async (zoneData: Partial<FieldZone>) => {
    const res = await api.addZone(zoneData);
    if (res.zones) {
      setZones(res.zones);
    }
  };

  const handleClearHistory = async () => {
    await api.clearAdvisoryHistory();
    setHistory([]);
    setLatestReport(null);
  };

  const handleSelectZoneForAdvisory = (zone: FieldZone) => {
    setSelectedZoneForModal(zone);
    setIsFieldSetupOpen(true);
  };

  const handleFormAdvisorySubmit = async (formData: any) => {
    const res = await api.evaluateAdvisory(formData);
    if (res.report) {
      setLatestReport(res.report);
      setHistory(prev => [res.report, ...prev]);
      setCurrentTab('dashboard');
    }
  };

  const handleOpenNewAdvisory = () => {
    setSelectedZoneForModal(null);
    setIsFieldSetupOpen(true);
  };

  const t = translations[language];

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-stone-700 font-bold text-sm">
            Loading CROP ADVISORY Assistant...
          </p>
        </div>
      </div>
    );
  }

  const effectiveProfile: FarmerProfile = profile || {
    farmerId: 'FARMER-001',
    name: 'Ravi Kumar',
    mobileNumber: '9848022338',
    village: 'Rampur',
    district: 'Warangal',
    state: 'Telangana',
    farmName: 'Pedda Chenu (North Farm)',
    totalLandArea: 3.5,
    areaUnit: 'Acres',
    preferredLanguage: language
  };

  return (
    <div className="min-h-screen bg-stone-50/70 text-stone-900 flex flex-col font-sans selection:bg-emerald-200">
      
      {/* Top App Bar & Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        profile={effectiveProfile}
        onOpenAcademic={() => setIsAcademicOpen(true)}
        onOpenFieldSetup={handleOpenNewAdvisory}
      />

      {/* Main Container Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* DASHBOARD TAB */}
        {currentTab === 'dashboard' && (
          <Dashboard
            profile={effectiveProfile}
            latestReport={latestReport}
            history={history}
            zones={zones}
            language={language}
            onOpenFieldSetup={handleOpenNewAdvisory}
            onSelectZone={handleSelectZoneForAdvisory}
            onViewHistory={() => setCurrentTab('history')}
          />
        )}

        {/* FIELD ZONES TAB */}
        {currentTab === 'zones' && (
          <FieldZonesView
            zones={zones}
            language={language}
            onSelectZone={handleSelectZoneForAdvisory}
            onAddZone={handleAddZone}
          />
        )}

        {/* IRRIGATION CARD TAB */}
        {currentTab === 'irrigation' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <IrrigationCard
              advisory={latestReport}
              language={language}
              onRunNew={handleOpenNewAdvisory}
            />
          </div>
        )}

        {/* FERTILIZER CARD TAB */}
        {currentTab === 'fertilizer' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <FertilizerCard
              advisory={latestReport}
              language={language}
              onRunNew={handleOpenNewAdvisory}
            />
          </div>
        )}

        {/* YIELD ESTIMATION TAB */}
        {currentTab === 'yield' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <YieldCard
              advisory={latestReport}
              language={language}
              onRunNew={handleOpenNewAdvisory}
            />
          </div>
        )}

        {/* ADVISORY HISTORY TAB */}
        {currentTab === 'history' && (
          <AdvisoryHistory
            history={history}
            language={language}
            onClearHistory={handleClearHistory}
            onSelectReport={(rep) => {
              setLatestReport(rep);
              setCurrentTab('dashboard');
            }}
          />
        )}

        {/* PROFILE TAB */}
        {currentTab === 'profile' && (
          <FarmerProfileView
            profile={effectiveProfile}
            language={language}
            onUpdateProfile={handleUpdateProfile}
            onLanguageChange={setLanguage}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white/80 py-6 mt-12 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-stone-800">{t.appName}</span>
            <span>·</span>
            <span>{t.appSubtitle}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>India Context: Telangana & Andhra Pradesh Agricultural Practices</span>
            <button
              onClick={() => setIsAcademicOpen(true)}
              className="text-emerald-700 font-bold hover:underline"
            >
              Academic Specifications (DMGT, AI, ADSA, OOPJ, Python)
            </button>
          </div>
        </div>
      </footer>

      {/* Field Setup & Advisory Modal */}
      <FieldSetupModal
        isOpen={isFieldSetupOpen}
        onClose={() => setIsFieldSetupOpen(false)}
        onSubmit={handleFormAdvisorySubmit}
        initialZone={selectedZoneForModal}
        language={language}
        district={effectiveProfile.district}
      />

      {/* Academic / Evaluator Specifications Modal */}
      <AcademicModal
        isOpen={isAcademicOpen}
        onClose={() => setIsAcademicOpen(false)}
        language={language}
      />

    </div>
  );
}

import React from 'react';
import { Sprout, Globe, User, BookOpen, Layers, History, Home, Compass } from 'lucide-react';
import { Language, FarmerProfile } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  profile: FarmerProfile | null;
  onOpenAcademic: () => void;
  onOpenFieldSetup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  profile,
  onOpenAcademic,
  onOpenFieldSetup
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-stone-900 tracking-tight text-lg">
                  {t.appName}
                </span>
                <span className="hidden sm:inline text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {t.appSubtitle}
                </span>
              </div>
              {profile && (
                <div className="text-xs text-stone-500 flex items-center gap-1.5">
                  <span className="font-medium text-stone-700">{profile.name}</span>
                  <span>·</span>
                  <span>{profile.village}, {profile.district}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentTab === 'dashboard'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Home className="w-4 h-4" />
              {t.dashboard}
            </button>

            <button
              onClick={() => setCurrentTab('zones')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentTab === 'zones'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              {t.fieldZones}
            </button>

            <button
              onClick={() => setCurrentTab('history')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentTab === 'history'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <History className="w-4 h-4" />
              {t.advisoryHistory}
            </button>

            <button
              onClick={() => setCurrentTab('profile')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentTab === 'profile'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <User className="w-4 h-4" />
              {t.profile}
            </button>
          </nav>

          {/* Right Controls: New Advisory Button, Language Switcher, Academic Spec */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenFieldSetup}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-xs sm:text-sm px-3.5 py-2 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>{t.runNewAdvisory}</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center border border-stone-200 rounded-lg p-0.5 bg-stone-100">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-bold rounded transition-all ${
                  language === 'en'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Switch to English"
              >
                ENG
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-2 py-1 text-xs font-bold rounded transition-all ${
                  language === 'te'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="తెలుగులోకి మార్చండి"
              >
                తెలుగు
              </button>
            </div>

            {/* Project Specs (Evaluator Modal) */}
            <button
              onClick={onOpenAcademic}
              className="text-stone-600 hover:text-emerald-700 hover:bg-stone-100 p-2 rounded-lg border border-transparent transition-colors"
              title="View College Academic Specifications (DMGT, AI, ADSA, OOPJ, Python)"
            >
              <BookOpen className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around border-t border-stone-200 py-2 text-xs font-medium text-stone-600">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`py-1 px-2 rounded ${currentTab === 'dashboard' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
          >
            {t.dashboard}
          </button>
          <button
            onClick={() => setCurrentTab('zones')}
            className={`py-1 px-2 rounded ${currentTab === 'zones' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
          >
            {t.fieldZones}
          </button>
          <button
            onClick={() => setCurrentTab('history')}
            className={`py-1 px-2 rounded ${currentTab === 'history' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
          >
            {t.advisoryHistory}
          </button>
          <button
            onClick={() => setCurrentTab('profile')}
            className={`py-1 px-2 rounded ${currentTab === 'profile' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
          >
            {t.profile}
          </button>
        </div>

      </div>
    </header>
  );
};

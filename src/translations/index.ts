export interface TranslationDict {
  appName: string;
  appSubtitle: string;
  dashboard: string;
  myFarm: string;
  fieldZones: string;
  irrigation: string;
  fertilizer: string;
  yield: string;
  advisoryHistory: string;
  profile: string;
  academicDoc: string;

  // Primary Farmer Card Headers
  irrigationAdvisory: string;
  fertilizerAdvisory: string;
  yieldEstimation: string;
  fieldZoneMap: string;
  recentAdvisories: string;

  // Action Buttons
  viewAdvice: string;
  viewEstimate: string;
  runNewAdvisory: string;
  saveChanges: string;
  cancel: string;
  loadHistoricalSoil: string;
  clearHistory: string;
  printSlip: string;

  // Field Inputs
  crop: string;
  season: string;
  soilType: string;
  fieldArea: string;
  areaUnit: string;
  soilMoistureStatus: string;
  farmerObservedMoistureLabel: string;
  recentRainfallStatus: string;
  nitrogenStatus: string;
  phosphorusStatus: string;
  potassiumStatus: string;
  estimatedNutrientStatusLabel: string;
  soilSourceNote: string;

  // Levels
  low: string;
  medium: string;
  high: string;

  // Irrigation Statuses
  irrigationRequired: string;
  irrigationNotRequiredNow: string;
  monitorSoilMoisture: string;

  // Format headers
  problem: string;
  whyReason: string;
  advisory: string;
  suggestedAction: string;

  // Yield
  tonsPerHectare: string;
  totalEstimatedYield: string;
  yieldDisclaimer: string;

  // Safety
  fertilizerDisclaimer: string;

  // Profile Fields
  farmerName: string;
  mobileNumber: string;
  village: string;
  district: string;
  state: string;
  farmName: string;
  totalLandArea: string;
  preferredLanguage: string;
}

export const translations: Record<'en' | 'te', TranslationDict> = {
  en: {
    appName: "CROP ADVISORY",
    appSubtitle: "Smart Farmer Assistant",
    dashboard: "Dashboard",
    myFarm: "My Farm",
    fieldZones: "Field Zones",
    irrigation: "Irrigation",
    fertilizer: "Fertilizer",
    yield: "Yield",
    advisoryHistory: "Advisory History",
    profile: "Farmer Profile",
    academicDoc: "Project Engineering Specs",

    irrigationAdvisory: "IRRIGATION ADVISORY",
    fertilizerAdvisory: "FERTILIZER ADVISORY",
    yieldEstimation: "YIELD ESTIMATION",
    fieldZoneMap: "FIELD ZONE MAP",
    recentAdvisories: "RECENT ADVISORIES",

    viewAdvice: "View Advice →",
    viewEstimate: "View Estimate →",
    runNewAdvisory: "Get Advisory for Field",
    saveChanges: "Save Profile",
    cancel: "Cancel",
    loadHistoricalSoil: "Auto-Fill from District Soil Records",
    clearHistory: "Clear History",
    printSlip: "Print Advisory Slip",

    crop: "Crop",
    season: "Season",
    soilType: "Soil Type",
    fieldArea: "Field Area",
    areaUnit: "Unit",
    soilMoistureStatus: "Current Soil Moisture Status",
    farmerObservedMoistureLabel: "Farmer-observed soil moisture",
    recentRainfallStatus: "Recent Rainfall Status",
    nitrogenStatus: "Nitrogen (N) Status",
    phosphorusStatus: "Phosphorus (P) Status",
    potassiumStatus: "Potassium (K) Status",
    estimatedNutrientStatusLabel: "Estimated nutrient status based on available historical information",
    soilSourceNote: "Values derived from previous soil-test records or regional baseline",

    low: "LOW",
    medium: "MEDIUM",
    high: "HIGH",

    irrigationRequired: "IRRIGATION REQUIRED",
    irrigationNotRequiredNow: "IRRIGATION NOT REQUIRED NOW",
    monitorSoilMoisture: "MONITOR SOIL MOISTURE",

    problem: "PROBLEM",
    whyReason: "WHY?",
    advisory: "ADVISORY",
    suggestedAction: "WHAT TO DO? (SUGGESTED ACTION)",

    tonsPerHectare: "tons/hectare",
    totalEstimatedYield: "Total Estimated Harvest",
    yieldDisclaimer: "Estimated value — actual yield may vary depending on field conditions, weather, crop management and other factors.",

    fertilizerDisclaimer: "Follow the crop- and soil-specific fertilizer dose recommended by your local agricultural authority or soil-test recommendation.",

    farmerName: "Farmer Name",
    mobileNumber: "Mobile Number",
    village: "Village",
    district: "District",
    state: "State",
    farmName: "Farm / Field Name",
    totalLandArea: "Total Land Area",
    preferredLanguage: "Preferred Language"
  },
  te: {
    appName: "పంట సలహా వేదిక",
    appSubtitle: "రైతు స్మార్ట్ సహాయకుడు",
    dashboard: "డాష్‌బోర్డ్",
    myFarm: "నా పొలం",
    fieldZones: "పొలం విభాగాలు (జోన్లు)",
    irrigation: "నీటి పారుదల",
    fertilizer: "ఎరువుల సలహా",
    yield: "దిగుబడి అంచనా",
    advisoryHistory: "సలహా చరిత్ర",
    profile: "రైతు వివరాలు",
    academicDoc: "ప్రాజెక్ట్ సాంకేతిక వివరాలు",

    irrigationAdvisory: "నీటి పారుదల సలహా",
    fertilizerAdvisory: "ఎరువుల యాజమాన్య సలహా",
    yieldEstimation: "దిగుబడి అంచనా",
    fieldZoneMap: "పొలం విభాగాల పటం (FIELD ZONE MAP)",
    recentAdvisories: "ఇటీవలి సలహాలు",

    viewAdvice: "సలహా చూడండి →",
    viewEstimate: "అంచనా చూడండి →",
    runNewAdvisory: "పొలానికి సలహా పొందండి",
    saveChanges: "వివరాలు భద్రపరచండి",
    cancel: "రద్దు చేయండి",
    loadHistoricalSoil: "జిల్లా భూసార రికార్డుల నుండి పొందండి",
    clearHistory: "చరిత్రను తొలగించండి",
    printSlip: "సలహా పత్రం ముద్రించండి",

    crop: "పంట",
    season: "కాలం (సీజన్)",
    soilType: "నేల రకం",
    fieldArea: "విస్తీర్ణం",
    areaUnit: "కొలత",
    soilMoistureStatus: "ప్రస్తుత నేలలో తేమ స్థితి",
    farmerObservedMoistureLabel: "రైతు పరిశీలించిన నేలలో తేమ",
    recentRainfallStatus: "ఇటీవలి వర్షపాత స్థితి",
    nitrogenStatus: "నత్రజని (N) స్థితి",
    phosphorusStatus: "భాస్వరం (P) స్థితి",
    potassiumStatus: "పొటాష్ (K) స్థితి",
    estimatedNutrientStatusLabel: "లభ్యమైన చారిత్రక సమాచారం ఆధారంగా అంచనా వేసిన పోషక స్థితి",
    soilSourceNote: "మునుపటి భూసార పరీక్ష రికార్డులు లేదా ప్రాంతీయ సమాచారంపై ఆధారపడి ఉంటుంది",

    low: "తక్కువ (LOW)",
    medium: "మధ్యస్థం (MEDIUM)",
    high: "ఎక్కువ (HIGH)",

    irrigationRequired: "నీటి తడి అవసరం (IRRIGATION REQUIRED)",
    irrigationNotRequiredNow: "ప్రస్తుతం నీటి తడి అవసరం లేదు (NOT REQUIRED NOW)",
    monitorSoilMoisture: "నేలలో తేమను పరిశీలించండి (MONITOR SOIL MOISTURE)",

    problem: "సమస్య (PROBLEM)",
    whyReason: "ఎందుకు? కారణం (WHY?)",
    advisory: "సిఫార్సు సలహా (ADVISORY)",
    suggestedAction: "ఏమి చేయాలి? సూచించిన చర్య (WHAT TO DO?)",

    tonsPerHectare: "టన్నులు / హెక్టారుకు",
    totalEstimatedYield: "మొత్తం అంచనా దిగుబడి",
    yieldDisclaimer: "అంచనా వేసిన విలువ — పొలంలో పరిస్థితులు, వాతావరణం, పంట యాజమాన్యం మరియు ఇతర కారణాలపై ఆధారపడి వాస్తవ దిగుబడి మారవచ్చు.",

    fertilizerDisclaimer: "మీ స్థానిక వ్యవసాయ అధికారి లేదా భూసార పరీక్ష సిఫార్సు చేసిన పంట మరియు నేల-నిర్దిష్ట ఎరువుల మోతాదును పాటించండి.",

    farmerName: "రైతు పేరు",
    mobileNumber: "మొబైల్ నంబర్",
    village: "గ్రామం",
    district: "జిల్లా",
    state: "రాష్ట్రం",
    farmName: "పొలం / చేను పేరు",
    totalLandArea: "మొత్తం భూమి విస్తీర్ణం",
    preferredLanguage: "ప్రాధాన్య భాష"
  }
};

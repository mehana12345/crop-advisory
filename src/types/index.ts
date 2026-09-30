export type Language = 'en' | 'te';

export type StatusLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface FarmerProfile {
  farmerId: string;
  name: string;
  mobileNumber: string;
  village: string;
  district: string;
  state: string;
  farmName: string;
  totalLandArea: number;
  areaUnit: string;
  preferredLanguage: Language;
}

export interface FieldZone {
  id: string;
  name: string;
  crop: string;
  season: string;
  soilType: string;
  area: number;
  areaUnit: string;
  rainfall: StatusLevel;
  soilMoisture: StatusLevel;
  nitrogen: StatusLevel;
  phosphorus: StatusLevel;
  potassium: StatusLevel;
  nutrientSource?: string;
  latestAdvisory?: AdvisoryReport;
}

export interface IrrigationAdvisoryResult {
  status: string; // 'IRRIGATION REQUIRED' | 'IRRIGATION NOT REQUIRED NOW' | 'MONITOR SOIL MOISTURE'
  statusCode: 'REQUIRED' | 'NOT_REQUIRED' | 'MONITOR';
  problem: string;
  why: string;
  advisory: string;
  suggestedAction: string;
}

export interface NutrientIssue {
  nutrient: string;
  level: StatusLevel;
  problem: string;
  reason: string;
  advisory: string;
  suggestedAction: string;
}

export interface FertilizerAdvisoryResult {
  nitrogen: StatusLevel;
  phosphorus: StatusLevel;
  potassium: StatusLevel;
  nutrientSource: string;
  hasDeficiency: boolean;
  summary: string;
  issues: NutrientIssue[];
  statutoryDisclaimer: string;
}

export interface YieldEstimationResult {
  estimated_yield_tons_per_ha: number;
  estimated_total_yield_tons: number;
  calculated_hectares: number;
  field_area: number;
  area_unit: string;
  model_name: string;
  r2_score: number;
  mae_error: number;
  influence: {
    water_availability: string;
    nutrient_balance: string;
    crop: string;
    season: string;
    soil_type: string;
  };
  disclaimer: string;
}

export interface AdvisoryReport {
  reportId: string;
  timestamp: string;
  farmer: {
    name: string;
    village: string;
    district: string;
    state: string;
    mobileNumber: string;
  };
  field: {
    zoneName: string;
    crop: string;
    season: string;
    soilType: string;
    fieldArea: number;
    areaUnit: string;
    rainfall: StatusLevel;
    soilMoisture: StatusLevel;
    moistureLabel: string;
    nitrogen: StatusLevel;
    phosphorus: StatusLevel;
    potassium: StatusLevel;
    nutrientSource: string;
  };
  irrigation: IrrigationAdvisoryResult;
  fertilizer: FertilizerAdvisoryResult;
  yieldEstimation: YieldEstimationResult;
}

export interface HistoricalSoilRecord {
  state: string;
  district: string;
  village: string;
  soil_type: string;
  historical_nitrogen: StatusLevel;
  historical_phosphorus: StatusLevel;
  historical_potassium: StatusLevel;
  reference_survey_year: string;
  source_agency: string;
  notes: string;
}

export interface AcademicSpec {
  dmgt: {
    subject: string;
    concept: string;
    predicates: string[];
  };
  ai: {
    subject: string;
    concept: string;
    mechanism: string;
  };
  adsa: {
    subject: string;
    concept: string;
    graphStructure: string;
    traversal: string;
  };
  oopj: {
    subject: string;
    concept: string;
    classes: string[];
  };
  python: {
    subject: string;
    concept: string;
    modules: string[];
  };
}

import { FarmerProfile, FieldZone, AdvisoryReport, HistoricalSoilRecord, AcademicSpec } from '../types';

export const api = {
  // Farmer Profile
  async getProfile(): Promise<FarmerProfile> {
    const res = await fetch('/api/profile');
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },

  async updateProfile(profile: Partial<FarmerProfile>): Promise<{ success: boolean; profile: FarmerProfile }> {
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // Field Zones
  async getZones(): Promise<FieldZone[]> {
    const res = await fetch('/api/zones');
    if (!res.ok) throw new Error('Failed to fetch field zones');
    return res.json();
  },

  async addZone(zone: Partial<FieldZone>): Promise<{ success: boolean; zone: FieldZone; zones: FieldZone[] }> {
    const res = await fetch('/api/zones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(zone)
    });
    if (!res.ok) throw new Error('Failed to add zone');
    return res.json();
  },

  async updateZone(id: string, zone: Partial<FieldZone>): Promise<{ success: boolean; zone: FieldZone }> {
    const res = await fetch(`/api/zones/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(zone)
    });
    if (!res.ok) throw new Error('Failed to update zone');
    return res.json();
  },

  // Historical Soil Database
  async getHistoricalSoilRecords(): Promise<HistoricalSoilRecord[]> {
    const res = await fetch('/api/historical-soil');
    if (!res.ok) throw new Error('Failed to fetch historical soil records');
    return res.json();
  },

  // Advisory Generation (Runs Rule Engine + Python Regression)
  async evaluateAdvisory(payload: any): Promise<{ success: boolean; report: AdvisoryReport }> {
    const res = await fetch('/api/advisory/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.details || 'Failed to generate advisory');
    }
    return res.json();
  },

  // Advisory History
  async getAdvisoryHistory(): Promise<AdvisoryReport[]> {
    const res = await fetch('/api/advisory/history');
    if (!res.ok) throw new Error('Failed to fetch history');
    return res.json();
  },

  async clearAdvisoryHistory(): Promise<{ success: boolean }> {
    const res = await fetch('/api/advisory/history', { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to clear history');
    return res.json();
  },

  // Academic Specifications (DMGT, AI, ADSA, OOPJ, Python)
  async getAcademicSpec(): Promise<AcademicSpec> {
    const res = await fetch('/api/academic-spec');
    if (!res.ok) throw new Error('Failed to fetch academic specification');
    return res.json();
  },

  // ML Metrics
  async getMLMetrics(): Promise<any> {
    const res = await fetch('/api/ml/metrics');
    if (!res.ok) throw new Error('Failed to fetch ML metrics');
    return res.json();
  }
};

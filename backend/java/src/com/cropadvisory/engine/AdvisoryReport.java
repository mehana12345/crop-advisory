package com.cropadvisory.engine;

import com.cropadvisory.model.Farmer;
import com.cropadvisory.model.FieldZone;

import java.util.Date;

/**
 * Final Consolidated Output combining all THREE Core Advisory Outputs:
 * 1. Irrigation Advisory
 * 2. Fertilizer Advisory
 * 3. Yield Estimation
 */
public class AdvisoryReport {
    private String reportId;
    private Date timestamp;
    private Farmer farmer;
    private FieldZone zone;
    private IrrigationAdvisory irrigationAdvisory;
    private FertilizerAdvisory fertilizerAdvisory;
    private YieldPrediction yieldPrediction;

    public AdvisoryReport(String reportId, Farmer farmer, FieldZone zone,
                          IrrigationAdvisory irrigationAdvisory,
                          FertilizerAdvisory fertilizerAdvisory,
                          YieldPrediction yieldPrediction) {
        this.reportId = reportId;
        this.timestamp = new Date();
        this.farmer = farmer;
        this.zone = zone;
        this.irrigationAdvisory = irrigationAdvisory;
        this.fertilizerAdvisory = fertilizerAdvisory;
        this.yieldPrediction = yieldPrediction;
    }

    public String getReportId() { return reportId; }
    public Date getTimestamp() { return timestamp; }
    public Farmer getFarmer() { return farmer; }
    public FieldZone getZone() { return zone; }
    public IrrigationAdvisory getIrrigationAdvisory() { return irrigationAdvisory; }
    public FertilizerAdvisory getFertilizerAdvisory() { return fertilizerAdvisory; }
    public YieldPrediction getYieldPrediction() { return yieldPrediction; }

    public String getSummaryText() {
        StringBuilder sb = new StringBuilder();
        sb.append("--------------------------------\n");
        sb.append("CROP ADVISORY SUMMARY\n");
        sb.append("--------------------------------\n\n");
        sb.append("Farmer:\n").append(farmer.getName()).append("\n\n");
        sb.append("Crop:\n").append(zone.getCrop().getName()).append("\n\n");
        sb.append("Season:\n").append(zone.getCrop().getPreferredSeason().getDisplayName()).append("\n\n");
        sb.append("Soil:\n").append(zone.getSoil().getSoilType()).append("\n\n");
        sb.append("IRRIGATION:\n").append(irrigationAdvisory.getStatus()).append("\n\n");
        sb.append("Reason:\n").append(irrigationAdvisory.getWhy()).append("\n\n");
        sb.append("FERTILIZER:\n");
        sb.append("Nitrogen Status: ").append(fertilizerAdvisory.getNutrientStatus().getNitrogen()).append("\n");
        sb.append("Phosphorus Status: ").append(fertilizerAdvisory.getNutrientStatus().getPhosphorus()).append("\n");
        sb.append("Potassium Status: ").append(fertilizerAdvisory.getNutrientStatus().getPotassium()).append("\n\n");
        sb.append("Advisory:\n").append(fertilizerAdvisory.getPrimarySummary()).append("\n\n");
        sb.append("YIELD ESTIMATION:\n").append(yieldPrediction.getYieldTonsPerHa()).append(" tons/hectare\n\n");
        sb.append("Note:\n").append(yieldPrediction.getDisclaimer()).append("\n");
        sb.append("--------------------------------\n");
        return sb.toString();
    }
}

package com.cropadvisory.model;

/**
 * Encapsulates the estimated nutrient status of the field soil (N, P, K).
 * Complies with safety guidelines: values are farmer/historical estimates, not lab claims.
 */
public class NutrientStatus {
    private StatusLevel nitrogen;
    private StatusLevel phosphorus;
    private StatusLevel potassium;
    private String source; // "Historical Soil Test" or "Farmer Estimate"

    public NutrientStatus(StatusLevel nitrogen, StatusLevel phosphorus, StatusLevel potassium, String source) {
        this.nitrogen = nitrogen;
        this.phosphorus = phosphorus;
        this.potassium = potassium;
        this.source = source != null ? source : "Estimated nutrient status based on available historical information";
    }

    public StatusLevel getNitrogen() {
        return nitrogen;
    }

    public void setNitrogen(StatusLevel nitrogen) {
        this.nitrogen = nitrogen;
    }

    public StatusLevel getPhosphorus() {
        return phosphorus;
    }

    public void setPhosphorus(StatusLevel phosphorus) {
        this.phosphorus = phosphorus;
    }

    public StatusLevel getPotassium() {
        return potassium;
    }

    public void setPotassium(StatusLevel potassium) {
        this.potassium = potassium;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public boolean isAllSufficient() {
        return (nitrogen != StatusLevel.LOW) &&
               (phosphorus != StatusLevel.LOW) &&
               (potassium != StatusLevel.LOW);
    }
}

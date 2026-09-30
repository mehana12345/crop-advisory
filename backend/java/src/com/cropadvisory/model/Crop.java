package com.cropadvisory.model;

/**
 * Encapsulates Crop properties, water sensitivity, and standard potential.
 */
public class Crop {
    private String name; // Paddy, Cotton, Groundnut, Maize, Tomato, Chili, Sugarcane
    private Season preferredSeason;
    private String waterRequirementLevel; // HIGH, MEDIUM, MODERATE
    private double standardYieldPerHa;

    public Crop(String name, Season season) {
        this.name = name;
        this.preferredSeason = season;
        assignAgronomicDefaults(name);
    }

    private void assignAgronomicDefaults(String cropName) {
        if (cropName == null) return;
        switch (cropName.toLowerCase()) {
            case "paddy":
            case "sugarcane":
                this.waterRequirementLevel = "HIGH";
                this.standardYieldPerHa = cropName.equalsIgnoreCase("paddy") ? 4.5 : 75.0;
                break;
            case "cotton":
            case "tomato":
            case "chili":
                this.waterRequirementLevel = "MEDIUM";
                this.standardYieldPerHa = cropName.equalsIgnoreCase("tomato") ? 24.0 : 2.5;
                break;
            default:
                this.waterRequirementLevel = "MODERATE";
                this.standardYieldPerHa = 3.5;
        }
    }

    public String getName() {
        return name;
    }

    public Season getPreferredSeason() {
        return preferredSeason;
    }

    public String getWaterRequirementLevel() {
        return waterRequirementLevel;
    }

    public double getStandardYieldPerHa() {
        return standardYieldPerHa;
    }
}

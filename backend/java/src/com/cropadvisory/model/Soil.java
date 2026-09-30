package com.cropadvisory.model;

/**
 * Encapsulates Soil characteristics and observed moisture.
 */
public class Soil {
    private String soilType; // Red Soil, Black Soil, Clay Soil, Sandy Soil, Loamy Soil
    private StatusLevel farmerObservedMoisture;
    private double waterHoldingCapacityIndex; // 0.0 to 1.0

    public Soil(String soilType, StatusLevel farmerObservedMoisture) {
        this.soilType = soilType;
        this.farmerObservedMoisture = farmerObservedMoisture;
        this.waterHoldingCapacityIndex = calculateCapacityIndex(soilType);
    }

    private double calculateCapacityIndex(String type) {
        if (type == null) return 0.5;
        switch (type.toLowerCase()) {
            case "black soil":
            case "clay soil":
                return 0.85;
            case "loamy soil":
                return 0.70;
            case "red soil":
                return 0.55;
            case "sandy soil":
                return 0.35;
            default:
                return 0.50;
        }
    }

    public String getSoilType() {
        return soilType;
    }

    public StatusLevel getFarmerObservedMoisture() {
        return farmerObservedMoisture;
    }

    public void setFarmerObservedMoisture(StatusLevel moisture) {
        this.farmerObservedMoisture = moisture;
    }

    public double getWaterHoldingCapacityIndex() {
        return waterHoldingCapacityIndex;
    }
}

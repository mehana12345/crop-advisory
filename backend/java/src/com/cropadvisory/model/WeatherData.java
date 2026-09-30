package com.cropadvisory.model;

/**
 * Encapsulates rainfall and local climatic conditions observed by the farmer.
 */
public class WeatherData {
    private StatusLevel recentRainfall;
    private double temperatureCelsius;
    private String rainfallObservationNotes;

    public WeatherData(StatusLevel recentRainfall) {
        this.recentRainfall = recentRainfall;
        this.temperatureCelsius = 28.0; // Typical agricultural average
        this.rainfallObservationNotes = "Farmer-observed recent rainfall status";
    }

    public WeatherData(StatusLevel recentRainfall, double temperatureCelsius, String notes) {
        this.recentRainfall = recentRainfall;
        this.temperatureCelsius = temperatureCelsius;
        this.rainfallObservationNotes = notes;
    }

    public StatusLevel getRecentRainfall() {
        return recentRainfall;
    }

    public void setRecentRainfall(StatusLevel recentRainfall) {
        this.recentRainfall = recentRainfall;
    }

    public double getTemperatureCelsius() {
        return temperatureCelsius;
    }

    public void setTemperatureCelsius(double temperatureCelsius) {
        this.temperatureCelsius = temperatureCelsius;
    }

    public String getRainfallObservationNotes() {
        return rainfallObservationNotes;
    }
}

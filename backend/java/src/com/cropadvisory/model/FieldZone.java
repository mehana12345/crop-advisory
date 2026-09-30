package com.cropadvisory.model;

/**
 * Encapsulates a distinct management parcel or zone within a farm field.
 * Essential for ADSA graph modeling of farm subdivisions.
 */
public class FieldZone {
    private String zoneId;
    private String zoneName;
    private double areaAcres;
    private Soil soil;
    private Crop crop;
    private NutrientStatus nutrientStatus;
    private WeatherData weatherData;

    public FieldZone(String zoneId, String zoneName, double areaAcres, Soil soil, Crop crop, NutrientStatus nutrientStatus, WeatherData weatherData) {
        this.zoneId = zoneId;
        this.zoneName = zoneName;
        this.areaAcres = areaAcres;
        this.soil = soil;
        this.crop = crop;
        this.nutrientStatus = nutrientStatus;
        this.weatherData = weatherData;
    }

    public String getZoneId() {
        return zoneId;
    }

    public String getZoneName() {
        return zoneName;
    }

    public double getAreaAcres() {
        return areaAcres;
    }

    public Soil getSoil() {
        return soil;
    }

    public Crop getCrop() {
        return crop;
    }

    public NutrientStatus getNutrientStatus() {
        return nutrientStatus;
    }

    public WeatherData getWeatherData() {
        return weatherData;
    }

    public void setSoil(Soil soil) {
        this.soil = soil;
    }

    public void setCrop(Crop crop) {
        this.crop = crop;
    }

    public void setNutrientStatus(NutrientStatus nutrientStatus) {
        this.nutrientStatus = nutrientStatus;
    }

    public void setWeatherData(WeatherData weatherData) {
        this.weatherData = weatherData;
    }
}

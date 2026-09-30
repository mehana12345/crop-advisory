package com.cropadvisory.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Encapsulates Farmer Profile Information.
 */
public class Farmer {
    private String farmerId;
    private String name;
    private String mobileNumber;
    private String village;
    private String district;
    private String state;
    private String preferredLanguage; // "en" (English) or "te" (Telugu)
    private List<Field> fields;

    public Farmer(String farmerId, String name, String mobileNumber, String village, String district, String state, String preferredLanguage) {
        this.farmerId = farmerId;
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.village = village;
        this.district = district;
        this.state = state != null ? state : "Telangana";
        this.preferredLanguage = preferredLanguage != null ? preferredLanguage : "en";
        this.fields = new ArrayList<>();
    }

    public String getFarmerId() {
        return farmerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
    }

    public List<Field> getFields() {
        return fields;
    }

    public void addField(Field field) {
        this.fields.add(field);
    }
}

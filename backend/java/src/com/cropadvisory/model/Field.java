package com.cropadvisory.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Encapsulates the overall Field owned by the farmer, containing multiple FieldZones.
 */
public class Field {
    private String fieldId;
    private String fieldName;
    private double totalArea;
    private String areaUnit;
    private List<FieldZone> zones;

    public Field(String fieldId, String fieldName, double totalArea, String areaUnit) {
        this.fieldId = fieldId;
        this.fieldName = fieldName;
        this.totalArea = totalArea;
        this.areaUnit = areaUnit != null ? areaUnit : "Acres";
        this.zones = new ArrayList<>();
    }

    public String getFieldId() {
        return fieldId;
    }

    public String getFieldName() {
        return fieldName;
    }

    public double getTotalArea() {
        return totalArea;
    }

    public String getAreaUnit() {
        return areaUnit;
    }

    public List<FieldZone> getZones() {
        return zones;
    }

    public void addZone(FieldZone zone) {
        if (zone != null) {
            this.zones.add(zone);
        }
    }
}

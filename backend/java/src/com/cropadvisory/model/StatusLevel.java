package com.cropadvisory.model;

/**
 * Represents qualitative levels for agronomic variables.
 * Used for farmer-observed soil moisture, rainfall, and nutrient statuses.
 */
public enum StatusLevel {
    LOW,
    MEDIUM,
    HIGH;

    public static StatusLevel fromString(String val) {
        if (val == null) return MEDIUM;
        try {
            return StatusLevel.valueOf(val.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return MEDIUM;
        }
    }
}

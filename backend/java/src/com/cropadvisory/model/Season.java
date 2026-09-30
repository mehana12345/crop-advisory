package com.cropadvisory.model;

/**
 * Agronomic cropping seasons in India.
 */
public enum Season {
    KHARIF("Kharif (Monsoon)"),
    RABI("Rabi (Winter)"),
    SUMMER("Summer (Zaid)");

    private final String displayName;

    Season(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static Season fromString(String val) {
        if (val == null) return KHARIF;
        for (Season s : values()) {
            if (s.name().equalsIgnoreCase(val.trim())) return s;
        }
        return KHARIF;
    }
}

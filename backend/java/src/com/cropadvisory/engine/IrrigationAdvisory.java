package com.cropadvisory.engine;

/**
 * Encapsulates the Irrigation Advisory output.
 * Structure:
 * - Status: IRRIGATION REQUIRED / IRRIGATION NOT REQUIRED NOW / MONITOR SOIL MOISTURE
 * - PROBLEM
 * - WHY (Reason)
 * - ADVISORY
 * - SUGGESTED ACTION
 */
public class IrrigationAdvisory {
    private String status; // "IRRIGATION REQUIRED", "IRRIGATION NOT REQUIRED NOW", "MONITOR SOIL MOISTURE"
    private String problem;
    private String why;
    private String advisory;
    private String suggestedAction;
    private String moistureObservationNote;

    public IrrigationAdvisory(String status, String problem, String why, String advisory, String suggestedAction) {
        this.status = status;
        this.problem = problem;
        this.why = why;
        this.advisory = advisory;
        this.suggestedAction = suggestedAction;
        this.moistureObservationNote = "Farmer-observed soil moisture";
    }

    public String getStatus() { return status; }
    public String getProblem() { return problem; }
    public String getWhy() { return why; }
    public String getAdvisory() { return advisory; }
    public String getSuggestedAction() { return suggestedAction; }
    public String getMoistureObservationNote() { return moistureObservationNote; }

    @Override
    public String toString() {
        return "IRRIGATION: " + status + "\n" +
               "Problem: " + problem + "\n" +
               "Why: " + why + "\n" +
               "Advisory: " + advisory + "\n" +
               "Suggested Action: " + suggestedAction;
    }
}

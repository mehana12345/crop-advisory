package com.cropadvisory.engine;

import com.cropadvisory.model.NutrientStatus;
import com.cropadvisory.model.StatusLevel;

import java.util.ArrayList;
import java.util.List;

/**
 * Encapsulates the Fertilizer Advisory output.
 * Structure:
 * - N, P, K status values
 * - PROBLEM
 * - WHY (Reason)
 * - ADVISORY
 * - SUGGESTED ACTION
 * - Safety instruction
 */
public class FertilizerAdvisory {

    public static class NutrientIssue {
        private String nutrient; // Nitrogen, Phosphorus, Potassium
        private StatusLevel status;
        private String problem;
        private String reason;
        private String advisory;
        private String suggestedAction;

        public NutrientIssue(String nutrient, StatusLevel status, String problem, String reason, String advisory, String suggestedAction) {
            this.nutrient = nutrient;
            this.status = status;
            this.problem = problem;
            this.reason = reason;
            this.advisory = advisory;
            this.suggestedAction = suggestedAction;
        }

        public String getNutrient() { return nutrient; }
        public StatusLevel getStatus() { return status; }
        public String getProblem() { return problem; }
        public String getReason() { return reason; }
        public String getAdvisory() { return advisory; }
        public String getSuggestedAction() { return suggestedAction; }
    }

    private NutrientStatus nutrientStatus;
    private List<NutrientIssue> detectedIssues;
    private String primarySummary;
    private String statutoryDisclaimer;

    public FertilizerAdvisory(NutrientStatus nutrientStatus) {
        this.nutrientStatus = nutrientStatus;
        this.detectedIssues = new ArrayList<>();
        this.statutoryDisclaimer = "Follow the crop- and soil-specific fertilizer dose recommended by your local agricultural authority or soil-test recommendation.";
    }

    public void addIssue(NutrientIssue issue) {
        detectedIssues.add(issue);
    }

    public NutrientStatus getNutrientStatus() { return nutrientStatus; }
    public List<NutrientIssue> getDetectedIssues() { return detectedIssues; }
    public String getPrimarySummary() { return primarySummary; }
    public void setPrimarySummary(String primarySummary) { this.primarySummary = primarySummary; }
    public String getStatutoryDisclaimer() { return statutoryDisclaimer; }
    public boolean hasDeficiency() { return !detectedIssues.isEmpty(); }
}

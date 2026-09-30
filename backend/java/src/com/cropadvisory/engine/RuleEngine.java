package com.cropadvisory.engine;

import com.cropadvisory.dmgt.PredicateLogicEngine;
import com.cropadvisory.model.*;

import java.util.ArrayList;
import java.util.List;

/**
 * AI Subject: Forward-chaining Rule-based Expert Advisory Engine.
 * Evaluates FieldZone conditions through predicate rules and constructs recommendations.
 */
public class RuleEngine {

    private final List<AgronomyRule<IrrigationAdvisory>> irrigationRules;

    public RuleEngine() {
        this.irrigationRules = new ArrayList<>();
        initializeIrrigationRules();
    }

    private void initializeIrrigationRules() {
        // Rule 1: High Rain AND High Moisture
        irrigationRules.add(new AgronomyRule<>(
            "IRR-R1",
            "High Rain ∧ High Moisture → Not Required Now",
            PredicateLogicEngine.HighRainfall.and(PredicateLogicEngine.HighMoisture),
            zone -> new IrrigationAdvisory(
                "IRRIGATION NOT REQUIRED NOW",
                "Soil moisture is high and recent rainfall is high.",
                "Recent rainfall is high and farmer-observed soil moisture is high.",
                "Irrigation is not required now.",
                "Wait and allow the soil surface to dry before evaluating field conditions again."
            )
        ));

        // Rule 2: High Rain AND Medium Moisture
        irrigationRules.add(new AgronomyRule<>(
            "IRR-R2",
            "High Rain ∧ Medium Moisture → Not Required / Monitor",
            PredicateLogicEngine.HighRainfall.and(PredicateLogicEngine.MediumMoisture),
            zone -> new IrrigationAdvisory(
                "IRRIGATION NOT REQUIRED NOW",
                "Rainfall is high while soil moisture is moderate.",
                "Recent rainfall has sufficiently replenished root zone moisture.",
                "Irrigation is currently not required. Monitor soil moisture.",
                "Check moisture depth after 48 hours to confirm optimal root zone aeration."
            )
        ));

        // Rule 3: Low Rain AND Low Moisture
        irrigationRules.add(new AgronomyRule<>(
            "IRR-R3",
            "Low Rain ∧ Low Moisture → Irrigation Required",
            PredicateLogicEngine.LowRainfall.and(PredicateLogicEngine.LowMoisture),
            zone -> new IrrigationAdvisory(
                "IRRIGATION REQUIRED",
                "Soil moisture is low and rainfall has been low.",
                "Both recent rainfall and farmer-observed soil moisture are low.",
                "Irrigation is recommended.",
                "Check the field condition and follow the crop-specific irrigation schedule to prevent wilting."
            )
        ));

        // Rule 4: Medium Rain AND Low Moisture
        irrigationRules.add(new AgronomyRule<>(
            "IRR-R4",
            "Medium Rain ∧ Low Moisture → Irrigation May Be Required",
            PredicateLogicEngine.MediumRainfall.and(PredicateLogicEngine.LowMoisture),
            zone -> new IrrigationAdvisory(
                "IRRIGATION REQUIRED",
                "Soil moisture is low despite moderate rainfall.",
                "Recent rainfall was insufficient to penetrate deeper soil layers.",
                "Irrigation may be required. Monitor the field and irrigate according to crop requirements.",
                "Inspect soil 10 cm below ground level and apply supplemental water as necessary."
            )
        ));

        // Rule 5: Low Rain AND High Moisture
        irrigationRules.add(new AgronomyRule<>(
            "IRR-R5",
            "Low Rain ∧ High Moisture → Not Required Now",
            PredicateLogicEngine.LowRainfall.and(PredicateLogicEngine.HighMoisture),
            zone -> new IrrigationAdvisory(
                "IRRIGATION NOT REQUIRED NOW",
                "Soil moisture is high despite low recent rainfall.",
                "Soil still retains adequate moisture from prior irrigation or high soil retention capacity.",
                "Irrigation is not required now.",
                "Monitor moisture over the next 2-3 days before taking action."
            )
        ));

        // Rule 6: Medium Rain AND High Moisture
        irrigationRules.add(new AgronomyRule<>(
            "IRR-R6",
            "Medium Rain ∧ High Moisture → Not Required Now",
            PredicateLogicEngine.MediumRainfall.and(PredicateLogicEngine.HighMoisture),
            zone -> new IrrigationAdvisory(
                "IRRIGATION NOT REQUIRED NOW",
                "Adequate moisture present in root zone.",
                "Moderate rainfall combined with high soil moisture maintains sufficient water balance.",
                "Irrigation is not required now.",
                "Maintain drainage channels if standing water is observed."
            )
        ));

        // Rule 7: Low Rain AND Medium Moisture
        irrigationRules.add(new AgronomyRule<>(
            "IRR-R7",
            "Low Rain ∧ Medium Moisture → Monitor Soil Moisture",
            PredicateLogicEngine.LowRainfall.and(PredicateLogicEngine.MediumMoisture),
            zone -> new IrrigationAdvisory(
                "MONITOR SOIL MOISTURE",
                "Moisture is moderate with dry recent weather.",
                "Recent rainfall is low while moisture remains in the medium range.",
                "Irrigation is not immediately urgent, but moisture may drop quickly.",
                "Monitor soil moisture daily and prepare irrigation facilities."
            )
        ));

        // Rule 8: Medium Rain AND Medium Moisture
        irrigationRules.add(new AgronomyRule<>(
            "IRR-R8",
            "Medium Rain ∧ Medium Moisture → Monitor Soil Moisture",
            PredicateLogicEngine.MediumRainfall.and(PredicateLogicEngine.MediumMoisture),
            zone -> new IrrigationAdvisory(
                "MONITOR SOIL MOISTURE",
                "Balanced moderate moisture and rainfall conditions.",
                "Both recent rainfall and soil moisture are in the medium range.",
                "Keep monitoring soil moisture according to crop growth stage.",
                "Observe crop canopy for any signs of midday leaf curling."
            )
        ));
    }

    public IrrigationAdvisory evaluateIrrigation(FieldZone zone) {
        for (AgronomyRule<IrrigationAdvisory> rule : irrigationRules) {
            if (rule.matches(zone)) {
                return rule.apply(zone);
            }
        }
        // Default fallback if boundary edge case occurs
        return new IrrigationAdvisory(
            "MONITOR SOIL MOISTURE",
            "Variable moisture conditions.",
            "Weather conditions and moisture status are transitional.",
            "Monitor soil moisture before planning irrigation.",
            "Inspect root depth moisture and consult crop growth stage requirements."
        );
    }

    public FertilizerAdvisory evaluateFertilizer(FieldZone zone) {
        NutrientStatus nutrients = zone.getNutrientStatus();
        FertilizerAdvisory advisory = new FertilizerAdvisory(nutrients);

        // Check Nitrogen
        if (nutrients.getNitrogen() == StatusLevel.LOW) {
            advisory.addIssue(new FertilizerAdvisory.NutrientIssue(
                "Nitrogen (N)",
                StatusLevel.LOW,
                "Low Nitrogen Status",
                "Nitrogen is marked as low for this field based on available historical/soil records.",
                "Nitrogen management is recommended.",
                "Follow the recommended nitrogen fertilizer dose (e.g., split application of Urea/Neem-coated urea) for this crop and soil condition."
            ));
        }

        // Check Phosphorus
        if (nutrients.getPhosphorus() == StatusLevel.LOW) {
            advisory.addIssue(new FertilizerAdvisory.NutrientIssue(
                "Phosphorus (P)",
                StatusLevel.LOW,
                "Low Phosphorus Status",
                "Phosphorus is marked as low for this field based on available soil information.",
                "Phosphorus management is recommended.",
                "Follow the recommended phosphorus fertilizer dose (e.g., Single Super Phosphate / DAP as basal application) as advised by your local agricultural officer."
            ));
        }

        // Check Potassium
        if (nutrients.getPotassium() == StatusLevel.LOW) {
            advisory.addIssue(new FertilizerAdvisory.NutrientIssue(
                "Potassium (K)",
                StatusLevel.LOW,
                "Low Potassium Status",
                "Potassium is marked as low for this field based on available soil information.",
                "Potassium management is recommended.",
                "Follow the recommended potassium fertilizer dose (e.g., Muriate of Potash / MOP) for optimal grain/boll filling and disease resistance."
            ));
        }

        if (advisory.getDetectedIssues().isEmpty()) {
            advisory.setPrimarySummary("No immediate nutrient deficiency is indicated from the available information. Continue standard maintenance dose as per local package of practices.");
        } else {
            StringBuilder sb = new StringBuilder();
            for (FertilizerAdvisory.NutrientIssue issue : advisory.getDetectedIssues()) {
                if (sb.length() > 0) sb.append("; ");
                sb.append(issue.getProblem()).append(" - ").append(issue.getAdvisory());
            }
            advisory.setPrimarySummary(sb.toString());
        }

        return advisory;
    }
}

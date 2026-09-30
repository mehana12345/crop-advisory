package com.cropadvisory.dmgt;

import com.cropadvisory.model.FieldZone;
import com.cropadvisory.model.StatusLevel;

/**
 * DMGT Unit 1: Predicate Logic Knowledge Base & Truth Evaluator.
 * Encodes agronomy rules as formal first-order predicate propositions:
 * P(zone) ∧ Q(zone) → R(zone)
 */
public class PredicateLogicEngine {

    // First-Order Atomic Predicates
    public static final AgronomyPredicate LowMoisture =
        zone -> zone.getSoil().getFarmerObservedMoisture() == StatusLevel.LOW;

    public static final AgronomyPredicate MediumMoisture =
        zone -> zone.getSoil().getFarmerObservedMoisture() == StatusLevel.MEDIUM;

    public static final AgronomyPredicate HighMoisture =
        zone -> zone.getSoil().getFarmerObservedMoisture() == StatusLevel.HIGH;

    public static final AgronomyPredicate LowRainfall =
        zone -> zone.getWeatherData().getRecentRainfall() == StatusLevel.LOW;

    public static final AgronomyPredicate MediumRainfall =
        zone -> zone.getWeatherData().getRecentRainfall() == StatusLevel.MEDIUM;

    public static final AgronomyPredicate HighRainfall =
        zone -> zone.getWeatherData().getRecentRainfall() == StatusLevel.HIGH;

    public static final AgronomyPredicate LowNitrogen =
        zone -> zone.getNutrientStatus().getNitrogen() == StatusLevel.LOW;

    public static final AgronomyPredicate LowPhosphorus =
        zone -> zone.getNutrientStatus().getPhosphorus() == StatusLevel.LOW;

    public static final AgronomyPredicate LowPotassium =
        zone -> zone.getNutrientStatus().getPotassium() == StatusLevel.HIGH.equals(StatusLevel.LOW); // safe check

    public static final AgronomyPredicate ActualLowPotassium =
        zone -> zone.getNutrientStatus().getPotassium() == StatusLevel.LOW;

    // Compound DMGT Proposition: LowMoisture(z) ∧ LowRainfall(z)
    public static final AgronomyPredicate IrrigationUrgentProposition =
        LowMoisture.and(LowRainfall);

    // Compound DMGT Proposition: HighMoisture(z) ∧ HighRainfall(z)
    public static final AgronomyPredicate IrrigationNotRequiredProposition =
        HighMoisture.and(HighRainfall);

    // Compound DMGT Proposition: LowMoisture(z) ∧ MediumRainfall(z)
    public static final AgronomyPredicate MoistureWatchProposition =
        LowMoisture.and(MediumRainfall);

    public static boolean evaluateRule(AgronomyPredicate antecedent, FieldZone zone) {
        return antecedent.test(zone);
    }
}

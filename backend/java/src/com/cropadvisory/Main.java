package com.cropadvisory;

import com.cropadvisory.adsa.FieldGraph;
import com.cropadvisory.engine.*;
import com.cropadvisory.model.*;

/**
 * Main Runner for CROP ADVISORY Rule Engine.
 * Demonstrates:
 * 1. OOPJ Class Encapsulation & Inheritance
 * 2. DMGT Predicate Logic Evaluation
 * 3. ADSA Field-Zone Relationship Graph Construction & BFS Traversal
 * 4. Irrigation Advisory, Fertilizer Advisory, and Yield Prediction assembly
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("CROP ADVISORY – Smart Farmer Assistant (OOPJ Engine)");
        System.out.println("==================================================");

        // 1. Instantiate Farmer & Field
        Farmer farmer = new Farmer(
            "FARMER-001",
            "Ravi Kumar",
            "9848022338",
            "Rampur",
            "Warangal",
            "Telangana",
            "en"
        );

        Field mainField = new Field("FIELD-01", "Pedda Chenu (North Field)", 3.5, "Acres");
        farmer.addField(mainField);

        // 2. Instantiate Agronomic Entities
        Soil redSoil = new Soil("Red Soil", StatusLevel.HIGH);
        Crop paddy = new Crop("Paddy", Season.KHARIF);
        WeatherData weather = new WeatherData(StatusLevel.HIGH);
        NutrientStatus nutrients = new NutrientStatus(
            StatusLevel.LOW,     // Nitrogen low
            StatusLevel.MEDIUM,  // Phosphorus medium
            StatusLevel.HIGH,    // Potassium high
            "Estimated nutrient status based on available historical information"
        );

        FieldZone zone1 = new FieldZone("ZONE-01", "Zone 1 - Main Paddy Block", 3.5, redSoil, paddy, nutrients, weather);
        mainField.addZone(zone1);

        // 3. Build ADSA Field-Zone Graph
        FieldGraph graph = new FieldGraph();
        graph.addNode(new FieldGraph.Node("farm_root", farmer.getName() + "'s Farm", "FARM"));
        graph.addNode(new FieldGraph.Node("zone_1", zone1.getZoneName(), "ZONE"));
        graph.addNode(new FieldGraph.Node("soil_1", redSoil.getSoilType(), "SOIL"));
        graph.addNode(new FieldGraph.Node("crop_1", paddy.getName(), "CROP"));
        graph.addNode(new FieldGraph.Node("moisture_1", "Moisture: " + redSoil.getFarmerObservedMoisture(), "MOISTURE"));
        graph.addNode(new FieldGraph.Node("advisory_1", "Advisory Node", "ADVISORY"));

        graph.addEdge("farm_root", "zone_1", "CONTAINS");
        graph.addEdge("zone_1", "soil_1", "HAS_SOIL");
        graph.addEdge("zone_1", "crop_1", "GROWS");
        graph.addEdge("zone_1", "moisture_1", "OBSERVES");
        graph.addEdge("zone_1", "advisory_1", "YIELDS_ADVICE");

        System.out.println("\n[ADSA] Field-Zone Graph successfully constructed.");
        System.out.println("[ADSA] BFS Graph Traversal Order:");
        for (FieldGraph.Node n : graph.traverseBFS("farm_root")) {
            System.out.println("  -> " + n.getNodeType() + ": " + n.getLabel());
        }

        // 4. Run AI Rule Engine with DMGT Predicate Logic
        RuleEngine engine = new RuleEngine();
        IrrigationAdvisory irrigation = engine.evaluateIrrigation(zone1);
        FertilizerAdvisory fertilizer = engine.evaluateFertilizer(zone1);

        // 5. Yield Prediction (from Python ML component)
        YieldPrediction yieldPred = new YieldPrediction(
            4.80,
            6.80,
            zone1.getAreaAcres(),
            "Acres",
            0.9647,
            0.41
        );

        // 6. Generate Complete Consolidated Advisory Report
        AdvisoryReport report = new AdvisoryReport(
            "REP-2026-001",
            farmer,
            zone1,
            irrigation,
            fertilizer,
            yieldPred
        );

        System.out.println("\n" + report.getSummaryText());
    }
}

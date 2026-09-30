# CROP ADVISORY – Smart Farmer Assistant

A production-style agricultural decision support system designed for smallholder farmers. The system synthesizes farmer-observed field conditions, regional soil test records, and statistical machine learning models to provide three primary advisory outputs:

1. **IRRIGATION ADVISORY**
2. **FERTILIZER ADVISORY**
3. **YIELD ESTIMATION**

The application features full dual-language support in **English** and **Telugu (తెలుగు)**, interactive field-zone graph visualizations, and strict compliance with agricultural safety and honesty guidelines (no claims of direct physical NPK/moisture sensors; clear labelling of farmer observations and statistical estimates).

---

## 🏛️ Academic Subject Architecture (College Project Implementation)

While technical jargon is intentionally hidden from the farmer-facing UI to maintain simplicity, each computer science subject is genuinely implemented in the codebase:

| Subject | Academic Unit / Concept | Implementation in Code |
| :--- | :--- | :--- |
| **DMGT** | Predicate Logic & Formal Truth Inference (Unit 1) | `backend/java/src/com/cropadvisory/dmgt/PredicateLogicEngine.java`<br>`LowMoisture(field) ∧ LowRainfall(field) → IrrigationRequired(field)` |
| **AI** | Rule-Based Inference Engine & Expert Agent (Unit 1) | `backend/java/src/com/cropadvisory/engine/RuleEngine.java`<br>Forward-chaining inference evaluating working memory facts against agronomic rules |
| **ADSA** | Field-Zone Relationship Graph & Adjacency Structure (Unit 2) | `backend/java/src/com/cropadvisory/adsa/FieldGraph.java` & `src/components/FieldZoneMap.tsx`<br>Multi-level graph: Farm Root → Zones → Soil, Crop, Moisture, Advisory with BFS/DFS traversal |
| **OOPJ** | Object-Oriented Java Architecture & Design Patterns | `backend/java/src/com/cropadvisory/model/*.java` & `backend/java/src/com/cropadvisory/engine/*.java`<br>Encapsulation, interfaces, polymorphism, exception handling, and collections |
| **Python** | Regression-based ML Pipeline for Yield Estimation | `backend/ml/*.py`<br>10-step Multiple Linear Regression pipeline with Ridge L2 regularization, feature encoding, train/test split, and $R^2$ / MAE validation |

---

## 📁 Repository Directory Structure

```
├── backend/
│   ├── data/
│   │   ├── advisory_history.json         # Persistent log of generated advisories
│   │   ├── farmer_profile.json           # Farmer profile and farm configuration
│   │   ├── field_zones.json              # Farm zones data
│   │   └── historical_soil_database.json # Regional soil baseline (Warangal, Guntur, etc.)
│   ├── java/
│   │   └── src/com/cropadvisory/
│   │       ├── Main.java                 # Standalone test runner and CLI harness
│   │       ├── model/                    # OOPJ Domain entities
│   │       │   ├── Farmer.java
│   │       │   ├── Field.java
│   │       │   ├── FieldZone.java
│   │       │   ├── Crop.java
│   │       │   ├── Soil.java
│   │       │   ├── WeatherData.java
│   │       │   ├── NutrientStatus.java
│   │       │   ├── Season.java
│   │       │   └── StatusLevel.java
│   │       ├── dmgt/                     # DMGT Predicate Logic
│   │       │   ├── AgronomyPredicate.java
│   │       │   └── PredicateLogicEngine.java
│   │       ├── adsa/                     # ADSA Graph implementation
│   │       │   └── FieldGraph.java
│   │       └── engine/                   # AI Rule Engine
│   │           ├── AgronomyRule.java
│   │           ├── RuleEngine.java
│   │           ├── IrrigationAdvisory.java
│   │           ├── FertilizerAdvisory.java
│   │           ├── YieldPrediction.java
│   │           └── AdvisoryReport.java
│   └── ml/                               # Python ML Regression Pipeline
│       ├── crop_yield_data.csv           # Agronomic dataset
│       ├── data_loading.py               # Dataset loading & synthesis
│       ├── data_preprocessing.py         # Categorical one-hot encoding & train/test split
│       ├── model_training.py             # Closed-form Ridge Regression trainer
│       ├── model_validation.py           # MAE, RMSE, and R² validation calculations
│       ├── prediction.py                 # Single record yield predictor
│       ├── predict_cli.py                # CLI bridge invoked by full-stack server
│       ├── train_and_save.py             # Pipeline execution script
│       ├── trained_model.json            # Serialized model parameters & weights
│       └── metrics.json                  # Saved evaluation scores (R²: 0.9647, MAE: 2.52)
├── src/
│   ├── components/
│   │   ├── AcademicModal.tsx             # Interactive engineering specifications viewer
│   │   ├── AdvisoryHistory.tsx           # History log, filters, and printable slip
│   │   ├── Dashboard.tsx                 # Core farmer dashboard with 3 primary cards
│   │   ├── FarmerProfileView.tsx         # Farmer details editor & language preference
│   │   ├── FertilizerCard.tsx            # NPK visual gauges and rule recommendations
│   │   ├── FieldSetupModal.tsx           # Field inputs & historical soil auto-fill
│   │   ├── FieldZoneMap.tsx              # ADSA interactive graph visualization
│   │   ├── FieldZonesView.tsx            # Zone management and adding new parcels
│   │   ├── IrrigationCard.tsx            # Rain/moisture indicators and action guidance
│   │   ├── Navbar.tsx                    # Brand, language toggle, and navigation
│   │   └── YieldCard.tsx                 # Regression yield forecast and factor impact
│   ├── services/
│   │   └── api.ts                        # Client API communication
│   ├── translations/
│   │   └── index.ts                      # English and Telugu localization dictionary
│   ├── types/
│   │   └── index.ts                      # TypeScript type contracts
│   ├── App.tsx                           # Master application router and state
│   ├── index.css                         # Tailwind CSS styling and print media rules
│   └── main.tsx                          # React entry point
├── package.json
├── server.ts                             # Full-stack Express server with Vite middleware
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Run Instructions

### 1. Start the Full-Stack Web Application (Port 3000)
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 2. Retrain the Python Yield Regression Model
```bash
python3 backend/ml/train_and_save.py
```
This loads/generates the demonstration dataset, splits into 80% train / 20% test sets, computes closed-form Ridge Regression weights, evaluates MAE and $R^2$, and writes `trained_model.json` and `metrics.json`.

### 3. Test the Python Prediction CLI Standalone
```bash
python3 backend/ml/predict_cli.py '{"crop":"Paddy","season":"Kharif","soil_type":"Red Soil","field_area":3.5,"rainfall":"MEDIUM","soil_moisture":"HIGH","nitrogen":"LOW","phosphorus":"MEDIUM","potassium":"HIGH"}'
```

---

## 🧪 Test Cases & Demonstration Scenarios

### Scenario 1: Dry Period with Low Moisture (Water Stress)
- **Inputs**: Crop = Cotton, Rainfall = LOW, Moisture = LOW, N = LOW, P = MEDIUM, K = MEDIUM
- **Irrigation Output**: `IRRIGATION REQUIRED`
  - *Problem*: Soil moisture is low and rainfall is insufficient.
  - *Why*: Both recent rainfall and farmer-observed soil moisture are low.
  - *Suggested Action*: Check field condition and follow crop-specific irrigation schedule promptly.
- **Fertilizer Output**: Nitrogen deficiency detected. Nitrogen management recommended.
- **Yield Estimate**: ~1.7–1.9 tons/hectare (reflects water deficit penalty).

### Scenario 2: Monsoon Inundation (High Rain & High Moisture)
- **Inputs**: Crop = Paddy, Rainfall = HIGH, Moisture = HIGH, N = MEDIUM, P = MEDIUM, K = HIGH
- **Irrigation Output**: `IRRIGATION NOT REQUIRED NOW`
  - *Why*: Recent rainfall is high and farmer-observed soil moisture is high.
  - *Suggested Action*: Wait and allow soil surface to aerate before evaluating conditions again.
- **Fertilizer Output**: Optimal balance; continue standard maintenance dose.
- **Yield Estimate**: ~4.8–5.2 tons/hectare.

### Scenario 3: Moderate Rain with Low Moisture (Transitional)
- **Inputs**: Crop = Chili, Rainfall = MEDIUM, Moisture = LOW
- **Irrigation Output**: `IRRIGATION REQUIRED` (Monitor root zone depth)
  - *Why*: Recent rainfall was light to moderate and was insufficient to deeply penetrate the soil.

---

## 🛡️ Safety & Agricultural Integrity Standards
1. **No Physical Sensor Claims**: Soil moisture is strictly labelled as *"Farmer-observed soil moisture"*.
2. **Estimated Nutrients**: NPK values are explicitly labelled as *"Estimated nutrient status based on available historical information"*.
3. **No Arbitrary Dosages**: Fertilizer recommendations instruct farmers to *"Follow the crop- and soil-specific fertilizer dose recommended by your local agricultural authority or soil-test recommendation."*
4. **Transparent Yield Forecasting**: Accompanied by the disclaimer *"Estimated value — actual yield may vary depending on field conditions, weather, crop management and other factors."*

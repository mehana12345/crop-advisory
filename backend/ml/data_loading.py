import csv
import json
import os
import random

def generate_demonstration_dataset(filepath: str, num_records: int = 600):
    """
    Generates a realistic agronomic dataset for Indian agriculture.
    Clearly labelled as DEMONSTRATION DATASET.
    Features:
    - crop: Paddy, Cotton, Groundnut, Maize, Tomato, Chili, Sugarcane
    - season: Kharif, Rabi, Summer
    - soil_type: Red Soil, Black Soil, Clay Soil, Sandy Soil, Loamy Soil
    - field_area: acres (1.0 to 10.0)
    - rainfall: LOW, MEDIUM, HIGH
    - soil_moisture: LOW, MEDIUM, HIGH
    - nitrogen: LOW, MEDIUM, HIGH
    - phosphorus: LOW, MEDIUM, HIGH
    - potassium: LOW, MEDIUM, HIGH
    - yield_tons_per_ha: target numerical value (tons per hectare)
    """
    random.seed(42)

    # Base yield potentials by crop (tons/ha)
    base_yields = {
        'Paddy': 4.5,
        'Cotton': 2.2,
        'Groundnut': 2.0,
        'Maize': 5.2,
        'Tomato': 24.0,
        'Chili': 2.8,
        'Sugarcane': 75.0
    }

    crops = list(base_yields.keys())
    seasons = ['Kharif', 'Rabi', 'Summer']
    soils = ['Red Soil', 'Black Soil', 'Clay Soil', 'Sandy Soil', 'Loamy Soil']
    levels = ['LOW', 'MEDIUM', 'HIGH']

    soil_multipliers = {
        'Loamy Soil': 1.15,
        'Black Soil': 1.10,
        'Clay Soil': 0.98,
        'Red Soil': 0.95,
        'Sandy Soil': 0.82
    }

    level_score = {'LOW': 0.78, 'MEDIUM': 1.0, 'HIGH': 1.12}

    rows = []
    headers = [
        'crop', 'season', 'soil_type', 'field_area',
        'rainfall', 'soil_moisture',
        'nitrogen', 'phosphorus', 'potassium',
        'yield_tons_per_ha'
    ]

    for _ in range(num_records):
        c = random.choice(crops)
        s = random.choice(seasons)
        soil = random.choice(soils)
        area = round(random.uniform(1.0, 8.0), 1)
        rain = random.choice(levels)
        moist = random.choice(levels)
        n = random.choice(levels)
        p = random.choice(levels)
        k = random.choice(levels)

        # Base yield with agronomic interaction formula + realistic stochastic noise
        base = base_yields[c]
        mult = soil_multipliers[soil]

        # Moisture & rain effect
        water_factor = (level_score[rain] * 0.45 + level_score[moist] * 0.55)
        # Nutrient balance effect
        nutrient_factor = (level_score[n] * 0.4 + level_score[p] * 0.3 + level_score[k] * 0.3)

        # Season compatibility penalty/bonus
        season_factor = 1.0
        if c == 'Paddy' and s == 'Kharif':
            season_factor = 1.08
        elif c == 'Cotton' and s == 'Summer':
            season_factor = 0.88
        elif c == 'Tomato' and s == 'Rabi':
            season_factor = 1.05

        noise = random.gauss(0, 0.05 * base)
        computed_yield = max(0.5, (base * mult * water_factor * nutrient_factor * season_factor) + noise)
        computed_yield = round(computed_yield, 2)

        rows.append([c, s, soil, area, rain, moist, n, p, k, computed_yield])

    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(rows)

    return filepath

def load_dataset(filepath: str):
    """Loads CSV dataset and returns list of dictionaries."""
    if not os.path.exists(filepath):
        generate_demonstration_dataset(filepath)

    data = []
    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            data.append({
                'crop': row['crop'],
                'season': row['season'],
                'soil_type': row['soil_type'],
                'field_area': float(row['field_area']),
                'rainfall': row['rainfall'],
                'soil_moisture': row['soil_moisture'],
                'nitrogen': row['nitrogen'],
                'phosphorus': row['phosphorus'],
                'potassium': row['potassium'],
                'yield_tons_per_ha': float(row['yield_tons_per_ha'])
            })
    return data

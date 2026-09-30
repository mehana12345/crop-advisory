import random
from typing import List, Dict, Tuple, Any

# Canonical categories
CROPS = ['Paddy', 'Cotton', 'Groundnut', 'Maize', 'Tomato', 'Chili', 'Sugarcane']
SEASONS = ['Kharif', 'Rabi', 'Summer']
SOILS = ['Red Soil', 'Black Soil', 'Clay Soil', 'Sandy Soil', 'Loamy Soil']
LEVELS = ['LOW', 'MEDIUM', 'HIGH']

def get_feature_names() -> List[str]:
    names = ['intercept']
    # Crop one-hot
    for c in CROPS:
        names.append(f"crop_{c}")
    # Season one-hot
    for s in SEASONS:
        names.append(f"season_{s}")
    # Soil one-hot
    for soil in SOILS:
        names.append(f"soil_{soil}")
    # Ordinal numeric mapping for moisture, rainfall, N, P, K
    names.extend(['rainfall_val', 'soil_moisture_val', 'n_val', 'p_val', 'k_val', 'field_area_norm'])
    return names

def encode_level(level: str) -> float:
    lvl = str(level).strip().upper()
    if lvl == 'LOW':
        return 0.0
    elif lvl == 'MEDIUM':
        return 1.0
    elif lvl == 'HIGH':
        return 2.0
    return 1.0

def encode_row(row: Dict[str, Any]) -> List[float]:
    features = [1.0] # intercept

    # Crop one-hot
    for c in CROPS:
        features.append(1.0 if row.get('crop') == c else 0.0)

    # Season one-hot
    for s in SEASONS:
        features.append(1.0 if row.get('season') == s else 0.0)

    # Soil one-hot
    for soil in SOILS:
        features.append(1.0 if row.get('soil_type') == soil else 0.0)

    # Ordinal values
    features.append(encode_level(row.get('rainfall', 'MEDIUM')))
    features.append(encode_level(row.get('soil_moisture', 'MEDIUM')))
    features.append(encode_level(row.get('nitrogen', 'MEDIUM')))
    features.append(encode_level(row.get('phosphorus', 'MEDIUM')))
    features.append(encode_level(row.get('potassium', 'MEDIUM')))

    # Normalized area (centered around 3 acres)
    area = float(row.get('field_area', 2.0))
    features.append(area / 10.0)

    return features

def preprocess_dataset(data: List[Dict[str, Any]], test_ratio: float = 0.2, seed: int = 42) -> Tuple[List[List[float]], List[float], List[List[float]], List[float]]:
    """Splits data into X_train, y_train, X_test, y_test."""
    shuffled = list(data)
    random.seed(seed)
    random.shuffle(shuffled)

    split_idx = int(len(shuffled) * (1.0 - test_ratio))
    train_data = shuffled[:split_idx]
    test_data = shuffled[split_idx:]

    X_train = [encode_row(r) for r in train_data]
    y_train = [float(r['yield_tons_per_ha']) for r in train_data]

    X_test = [encode_row(r) for r in test_data]
    y_test = [float(r['yield_tons_per_ha']) for r in test_data]

    return X_train, y_train, X_test, y_test

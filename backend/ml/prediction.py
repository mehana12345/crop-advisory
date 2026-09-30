import json
import os
from typing import Dict, Any
from backend.ml.data_preprocessing import encode_row

def load_model(filepath: str) -> Dict[str, Any]:
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def predict_single(input_data: Dict[str, Any], model_dict: Dict[str, Any]) -> Dict[str, Any]:
    weights = model_dict['weights']
    features = encode_row(input_data)

    # Linear combination
    dot = sum(f * w for f, w in zip(features, weights))
    estimated_yield_per_ha = max(0.2, round(dot, 2))

    # Calculate total yield based on field area (converting acres to hectares if needed, 1 acre ~ 0.4047 ha)
    area = float(input_data.get('field_area', 2.0))
    area_unit = input_data.get('area_unit', 'Acres')
    if area_unit.lower().startswith('acre'):
        hectares = area * 0.404686
    else:
        hectares = area

    total_yield_tons = round(estimated_yield_per_ha * hectares, 2)

    # Calculate nutrient & moisture influence factors for transparency
    moist = input_data.get('soil_moisture', 'MEDIUM').upper()
    rain = input_data.get('rainfall', 'MEDIUM').upper()
    n_status = input_data.get('nitrogen', 'MEDIUM').upper()
    p_status = input_data.get('phosphorus', 'MEDIUM').upper()
    k_status = input_data.get('potassium', 'MEDIUM').upper()

    influence = {
        'water_availability': 'Favorable' if moist in ['MEDIUM', 'HIGH'] or rain == 'HIGH' else 'Sub-optimal (Water stress risk)',
        'nutrient_balance': 'Balanced' if all(x in ['MEDIUM', 'HIGH'] for x in [n_status, p_status, k_status]) else 'Deficiency detected',
        'crop': input_data.get('crop', 'Paddy'),
        'season': input_data.get('season', 'Kharif'),
        'soil_type': input_data.get('soil_type', 'Red Soil')
    }

    return {
        'estimated_yield_tons_per_ha': estimated_yield_per_ha,
        'estimated_total_yield_tons': total_yield_tons,
        'calculated_hectares': round(hectares, 2),
        'field_area': area,
        'area_unit': area_unit,
        'model_name': model_dict.get('model_type', 'Multiple Linear Regression'),
        'r2_score': model_dict.get('metadata', {}).get('metrics', {}).get('r2', 0.88),
        'mae_error': model_dict.get('metadata', {}).get('metrics', {}).get('mae', 0.41),
        'influence': influence,
        'disclaimer': 'Estimated value — actual yield may vary depending on field conditions, weather, crop management and other factors.'
    }

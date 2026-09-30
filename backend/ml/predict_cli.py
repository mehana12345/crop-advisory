import sys
import os
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from backend.ml.prediction import load_model, predict_single

def main():
    ml_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(ml_dir, 'trained_model.json')

    # If model hasn't been trained yet, train it now
    if not os.path.exists(model_path):
        from backend.ml.train_and_save import main as train_main
        train_main()

    model_dict = load_model(model_path)

    # Read input from argv or stdin
    raw_input = None
    if len(sys.argv) > 1:
        raw_input = sys.argv[1]
    else:
        raw_input = sys.stdin.read()

    if not raw_input or not raw_input.strip():
        # Return fallback demo prediction
        sample = {
            'crop': 'Paddy',
            'season': 'Kharif',
            'soil_type': 'Red Soil',
            'field_area': 3.0,
            'rainfall': 'MEDIUM',
            'soil_moisture': 'HIGH',
            'nitrogen': 'LOW',
            'phosphorus': 'MEDIUM',
            'potassium': 'HIGH'
        }
        res = predict_single(sample, model_dict)
        print(json.dumps(res, indent=2))
        return

    try:
        data = json.loads(raw_input)
        res = predict_single(data, model_dict)
        print(json.dumps(res))
    except Exception as e:
        sys.stderr.write(f"Error predicting yield: {str(e)}\n")
        sys.exit(1)

if __name__ == '__main__':
    main()
